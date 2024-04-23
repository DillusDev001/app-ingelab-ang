import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertSearchParametroComponent } from './custom-alert-search-parametro.component';

describe('CustomAlertSearchParametroComponent', () => {
  let component: CustomAlertSearchParametroComponent;
  let fixture: ComponentFixture<CustomAlertSearchParametroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertSearchParametroComponent]
    });
    fixture = TestBed.createComponent(CustomAlertSearchParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
