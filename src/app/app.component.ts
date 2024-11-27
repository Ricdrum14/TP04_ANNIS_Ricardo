import { Component, VERSION } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP04_ANNIS_Ricardo' + VERSION.major;
  constructor() {}
}
