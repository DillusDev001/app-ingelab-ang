import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSubMenuButtonComponent } from './custom-sub-menu-button.component';

describe('CustomSubMenuButtonComponent', () => {
  let component: CustomSubMenuButtonComponent;
  let fixture: ComponentFixture<CustomSubMenuButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSubMenuButtonComponent]
    });
    fixture = TestBed.createComponent(CustomSubMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
