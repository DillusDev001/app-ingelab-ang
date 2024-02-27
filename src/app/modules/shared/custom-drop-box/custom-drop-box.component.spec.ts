import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropBoxComponent } from './custom-drop-box.component';

describe('CustomDropBoxComponent', () => {
  let component: CustomDropBoxComponent;
  let fixture: ComponentFixture<CustomDropBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDropBoxComponent]
    });
    fixture = TestBed.createComponent(CustomDropBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
