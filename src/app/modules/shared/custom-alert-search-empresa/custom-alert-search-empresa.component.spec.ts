import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertSearchEmpresaComponent } from './custom-alert-search-empresa.component';

describe('CustomAlertSearchEmpresaComponent', () => {
  let component: CustomAlertSearchEmpresaComponent;
  let fixture: ComponentFixture<CustomAlertSearchEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertSearchEmpresaComponent]
    });
    fixture = TestBed.createComponent(CustomAlertSearchEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
