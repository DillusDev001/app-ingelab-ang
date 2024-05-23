import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertSearchProveedorComponent } from './custom-alert-search-proveedor.component';

describe('CustomAlertSearchProveedorComponent', () => {
  let component: CustomAlertSearchProveedorComponent;
  let fixture: ComponentFixture<CustomAlertSearchProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertSearchProveedorComponent]
    });
    fixture = TestBed.createComponent(CustomAlertSearchProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
