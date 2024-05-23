import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInput3Component } from './custom-input3.component';

describe('CustomInput3Component', () => {
  let component: CustomInput3Component;
  let fixture: ComponentFixture<CustomInput3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInput3Component]
    });
    fixture = TestBed.createComponent(CustomInput3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
