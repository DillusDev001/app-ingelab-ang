import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlIconsComponent } from './html-icons.component';

describe('HtmlIconsComponent', () => {
  let component: HtmlIconsComponent;
  let fixture: ComponentFixture<HtmlIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlIconsComponent]
    });
    fixture = TestBed.createComponent(HtmlIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
