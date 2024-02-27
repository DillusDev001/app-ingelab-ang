import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertSearchComponent } from './custom-alert-search.component';

describe('CustomAlertSearchComponent', () => {
  let component: CustomAlertSearchComponent;
  let fixture: ComponentFixture<CustomAlertSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertSearchComponent]
    });
    fixture = TestBed.createComponent(CustomAlertSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
