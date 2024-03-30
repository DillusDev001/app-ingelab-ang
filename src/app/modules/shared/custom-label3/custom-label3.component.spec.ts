import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabel3Component } from './custom-label3.component';

describe('CustomLabel3Component', () => {
  let component: CustomLabel3Component;
  let fixture: ComponentFixture<CustomLabel3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabel3Component]
    });
    fixture = TestBed.createComponent(CustomLabel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
