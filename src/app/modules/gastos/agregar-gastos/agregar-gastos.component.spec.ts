import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGastosComponent } from './agregar-gastos.component';

describe('AgregarGastosComponent', () => {
  let component: AgregarGastosComponent;
  let fixture: ComponentFixture<AgregarGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarGastosComponent]
    });
    fixture = TestBed.createComponent(AgregarGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
