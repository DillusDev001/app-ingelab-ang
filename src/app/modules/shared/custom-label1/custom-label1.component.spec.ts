import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabel1Component } from './custom-label1.component';

describe('CustomLabel1Component', () => {
  let component: CustomLabel1Component;
  let fixture: ComponentFixture<CustomLabel1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabel1Component]
    });
    fixture = TestBed.createComponent(CustomLabel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
