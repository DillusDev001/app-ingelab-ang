import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSubTitleComponent } from './custom-sub-title.component';

describe('CustomSubTitleComponent', () => {
  let component: CustomSubTitleComponent;
  let fixture: ComponentFixture<CustomSubTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSubTitleComponent]
    });
    fixture = TestBed.createComponent(CustomSubTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
