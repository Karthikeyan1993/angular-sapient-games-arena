import { Directive, Input, HostListener, ComponentRef, ElementRef, ViewContainerRef, ComponentFactoryResolver, Renderer2,EventEmitter,Output} from "@angular/core";
import { NgControl } from '@angular/forms';
import { Subject, from } from "rxjs";
import { map, distinctUntilChanged, debounceTime, mergeMap, filter, toArray } from 'rxjs/operators';
import { AutoCompleteContainerComponent } from './auto-complete-container/auto-complete-container.component';

@Directive({
  selector: "[appAutoComplete]"
})
export class AutoCompleteDirective {
  listenFunc: Function;
  @Input() appAutoComplete: any[];
  inputEventSubscription: Subject<any> = new Subject<any>();
  matches = [];
  compRef: ComponentRef<AutoCompleteContainerComponent> = null;
  @Output() private selected: EventEmitter<any> = new EventEmitter();
  constructor(private element: ElementRef, private ngControl: NgControl, private _vcRef: ViewContainerRef, private _cfResolver: ComponentFactoryResolver, private _r2: Renderer2) {
    this.listenFunc = _r2.listen('document', 'click', (event: MouseEvent) => {
      if (this.element.nativeElement.contains(event.target)) {
        return;
      }
      this.OutsideClick();
    });
  }

  ngOnInit() {
    this.asyncAction();
  }

  asyncAction = () => {
    this.inputEventSubscription.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap((ele) => {
        return from(this.appAutoComplete)
          .pipe(filter((f) => this.filterText(ele, f)), toArray())
      })
    ).subscribe((result) => {
      this.finalSearchOperation(result);
    });
  }

  @HostListener('input', ['$event'])
  oninput = (e) => {
    const _api = e.target;
    const _value: string = _api.value !== undefined ? _api.value : _api.textContent !== undefined ? _api.textContent : _api.innerText;
    if (_value.length >= 2) {
      this.emitInputValue(_value);
    } else {
      this.hide();
    }
  }

  @HostListener('keyup', ['$event'])
  onchange = (e) => {
    if (e.keyCode === 27) {
      if (this.compRef) {
        this.hide();
      }
    }
    if (e.keyCode === 13) {
      if (this.compRef) {
        this.compRef.instance.selectActiveOnEnter();
      }
    }
    if (e.keyCode === 40) {
      if (this.compRef) {
        this.compRef.instance.nextActiveMatch();
      }
    }
    if (e.keyCode === 38) {
      if (this.compRef) {
        this.compRef.instance.nextPreviousMatch();
      }
    }
  }

  public changeModelValue = (value: any): void => {
    this.ngControl.viewToModelUpdate(value);
    (this.ngControl.control).setValue(value);
    this.selected.next(value);
    this.hide();
  }

  private filterText = (e: string, f: any): any => {
    return f.toLowerCase().indexOf(e.toLowerCase()) >= 0;
  }

  private finalSearchOperation = (param: any): void => {
    this.matches = param;
    if (this.hasMatches()) {
      this.show();
    }
  }

  private emitInputValue = (val) => {
    this.inputEventSubscription.next(val);
  }

  private hasMatches = (param?: any): boolean => {
    return this.matches.length > 0;
  }

  private show = (): void => {
    if (!this.compRef) {
      const resolver = this._cfResolver.resolveComponentFactory(AutoCompleteContainerComponent);
      this.compRef = this._vcRef.createComponent(resolver);
    }
    if (this.compRef) {
      this.compRef.instance.parent = this;
      this.compRef.instance.items = this.matches;
      this.compRef.instance.searchVal = this.element.nativeElement.value;
    }
  }
  private hide = (): void => {
    if (this.compRef) {
      this.compRef.destroy();
      this.compRef = undefined;
    }
  }

  private OutsideClick = () => {
    if (this.compRef && !this.compRef.instance.isFocused) {
      this.hide();
    }
  }

}
