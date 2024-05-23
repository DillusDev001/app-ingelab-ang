import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInput2Component } from './custom-input2.component';

describe('CustomInput2Component', () => {
  let component: CustomInput2Component;
  let fixture: ComponentFixture<CustomInput2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInput2Component]
    });
    fixture = TestBed.createComponent(CustomInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
