import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionsDetailsComponent } from './pollutions-details.component';

describe('PollutionsDetailsComponent', () => {
  let component: PollutionsDetailsComponent;
  let fixture: ComponentFixture<PollutionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollutionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
