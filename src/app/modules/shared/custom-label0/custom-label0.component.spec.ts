import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabel0Component } from './custom-label0.component';

describe('CustomLabel0Component', () => {
  let component: CustomLabel0Component;
  let fixture: ComponentFixture<CustomLabel0Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabel0Component]
    });
    fixture = TestBed.createComponent(CustomLabel0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
