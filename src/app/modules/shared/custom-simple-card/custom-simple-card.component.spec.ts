import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSimpleCardComponent } from './custom-simple-card.component';

describe('CustomSimpleCardComponent', () => {
  let component: CustomSimpleCardComponent;
  let fixture: ComponentFixture<CustomSimpleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSimpleCardComponent]
    });
    fixture = TestBed.createComponent(CustomSimpleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
