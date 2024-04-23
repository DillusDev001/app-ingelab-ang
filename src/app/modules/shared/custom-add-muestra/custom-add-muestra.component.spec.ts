import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAddMuestraComponent } from './custom-add-muestra.component';

describe('CustomAddMuestraComponent', () => {
  let component: CustomAddMuestraComponent;
  let fixture: ComponentFixture<CustomAddMuestraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAddMuestraComponent]
    });
    fixture = TestBed.createComponent(CustomAddMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
