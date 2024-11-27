import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSignalComponent } from './card-signal.component';

describe('CardSignalComponent', () => {
  let component: CardSignalComponent;
  let fixture: ComponentFixture<CardSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
