import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BankCardManagementModule } from './bank-card-management/bank-card-management.module';
import { CardListComponent } from './bank-card-management/card-list/card-list.component';
import { CardSignalComponent } from './bank-card-management/card-signal/card-signal.component';

@NgModule({
  imports: [BrowserModule, BankCardManagementModule,CardListComponent,CardSignalComponent],
  declarations: [AppComponent],
  providers:[],
  bootstrap: [AppComponent],
})
export class AppModule {}
