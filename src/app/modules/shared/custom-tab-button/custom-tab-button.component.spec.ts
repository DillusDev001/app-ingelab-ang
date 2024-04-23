import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTabButtonComponent } from './custom-tab-button.component';

describe('CustomTabButtonComponent', () => {
  let component: CustomTabButtonComponent;
  let fixture: ComponentFixture<CustomTabButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTabButtonComponent]
    });
    fixture = TestBed.createComponent(CustomTabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
