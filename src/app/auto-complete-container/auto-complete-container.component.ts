import { Component, OnInit,HostListener,HostBinding } from '@angular/core';
import { AutoCompleteDirective } from '../auto-complete.directive';

@Component({
  selector: 'app-auto-complete-container',
  templateUrl: './auto-complete-container.component.html',
  styleUrls: ['./auto-complete-container.component.css']
})
export class AutoCompleteContainerComponent implements OnInit {

  items = [];
  isFocused = false;
  parent: AutoCompleteDirective;
  _active = -1;
  searchVal;
  @HostBinding('class') classes = 'dropdown show';
  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  focusLost = (): void => {
    this.isFocused = false;
  }

  selectItem = (value: any): void => {
    this.parent.changeModelValue(value);
  }

  selectActive = (index: number): void => {
    this.isFocused = true;
    this._active = index;
  }

  selectActiveOnEnter = (): void => {
    if (this._active >= 0) {
      this.parent.changeModelValue(this.items[this._active]);
    }
  }

  nextActiveMatch = (): void => {
    this._active = this._active >= this.items.length - 1 ? 0 : this._active + 1;
  }

  nextPreviousMatch = (): void => {
    this._active = this._active <= 0 ? this.items.length - 1 : this._active - 1;
  }

}