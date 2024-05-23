import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardCuentaComponent } from './custom-card-cuenta.component';

describe('CustomCardCuentaComponent', () => {
  let component: CustomCardCuentaComponent;
  let fixture: ComponentFixture<CustomCardCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardCuentaComponent]
    });
    fixture = TestBed.createComponent(CustomCardCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
