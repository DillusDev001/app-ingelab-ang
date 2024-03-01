import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMenuButtonComponent } from './custom-menu-button.component';

describe('CustomMenuButtonComponent', () => {
  let component: CustomMenuButtonComponent;
  let fixture: ComponentFixture<CustomMenuButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomMenuButtonComponent]
    });
    fixture = TestBed.createComponent(CustomMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
