// validator.directive.ts
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidator]'
})
export class ValidatorDirective implements OnInit {
  @Input() appValidator: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) {}

  ngOnInit(): void {
    this.control.statusChanges?.subscribe(status => {
      if (status === 'INVALID' && this.control.dirty) {
        this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
        this.renderer.setProperty(this.el.nativeElement, 'placeholder', this.appValidator);
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'border');
      }
    });
  }
}
