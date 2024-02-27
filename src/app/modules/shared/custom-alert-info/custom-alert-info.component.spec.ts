import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertInfoComponent } from './custom-alert-info.component';

describe('CustomAlertInfoComponent', () => {
  let component: CustomAlertInfoComponent;
  let fixture: ComponentFixture<CustomAlertInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertInfoComponent]
    });
    fixture = TestBed.createComponent(CustomAlertInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
