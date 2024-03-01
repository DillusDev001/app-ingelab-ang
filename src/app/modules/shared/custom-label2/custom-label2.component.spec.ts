import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabel2Component } from './custom-label2.component';

describe('CustomLabel2Component', () => {
  let component: CustomLabel2Component;
  let fixture: ComponentFixture<CustomLabel2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabel2Component]
    });
    fixture = TestBed.createComponent(CustomLabel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
