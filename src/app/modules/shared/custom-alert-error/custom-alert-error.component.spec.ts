import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertErrorComponent } from './custom-alert-error.component';

describe('CustomAlertErrorComponent', () => {
  let component: CustomAlertErrorComponent;
  let fixture: ComponentFixture<CustomAlertErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertErrorComponent]
    });
    fixture = TestBed.createComponent(CustomAlertErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
