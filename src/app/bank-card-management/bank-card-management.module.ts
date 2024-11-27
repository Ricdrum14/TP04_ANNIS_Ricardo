import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorDirective } from './directives/validator.directive';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule],
  declarations: [FormComponent,ValidatorDirective],
  providers:[],
  exports:[FormComponent,ValidatorDirective]
})
export class BankCardManagementModule { }
