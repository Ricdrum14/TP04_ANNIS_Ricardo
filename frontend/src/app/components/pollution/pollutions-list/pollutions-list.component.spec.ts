import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionsListComponent } from './pollutions-list.component';

describe('PollutionsListComponent', () => {
  let component: PollutionsListComponent;
  let fixture: ComponentFixture<PollutionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
