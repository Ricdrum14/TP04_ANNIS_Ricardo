import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionsFormComponent } from './pollutions-form.component';

describe('PollutionsFormComponent', () => {
  let component: PollutionsFormComponent;
  let fixture: ComponentFixture<PollutionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollutionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
