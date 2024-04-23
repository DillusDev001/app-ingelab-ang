import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrxComponent } from './frx.component';

describe('FrxComponent', () => {
  let component: FrxComponent;
  let fixture: ComponentFixture<FrxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrxComponent]
    });
    fixture = TestBed.createComponent(FrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
