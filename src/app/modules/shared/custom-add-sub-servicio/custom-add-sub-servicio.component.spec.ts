import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAddSubServicioComponent } from './custom-add-sub-servicio.component';

describe('CustomAddSubServicioComponent', () => {
  let component: CustomAddSubServicioComponent;
  let fixture: ComponentFixture<CustomAddSubServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAddSubServicioComponent]
    });
    fixture = TestBed.createComponent(CustomAddSubServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
