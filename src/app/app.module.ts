import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from "./app-routing.module";

import { AuthenticationInterceptorService } from './services/authentication-interceptor.service';


import { AppComponent } from "./app.component";
import { CommonDataTableComponent } from "./common-data-table/common-data-table.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { GamesDashboardComponent } from './games-dashboard/games-dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TableSortPipe } from './table-sort.pipe';
import { AutoCompleteDirective } from './auto-complete.directive';
import { AutoCompleteContainerComponent } from './auto-complete-container/auto-complete-container.component';
import { HighlightPipe } from './highlight.pipe';
import { TableFilterPipe } from './table-filter.pipe';


@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule,AppRoutingModule,ScrollingModule],
  declarations: [
    AppComponent,
    CommonDataTableComponent,
    PageNotFoundComponent,
    GamesDashboardComponent,
    NavBarComponent,
    TableSortPipe,
    AutoCompleteDirective,
    AutoCompleteContainerComponent,
    HighlightPipe,
    TableFilterPipe,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true},ScrollDispatcher,TableSortPipe,TableFilterPipe],
  entryComponents:[AutoCompleteContainerComponent]
})
export class AppModule {}
