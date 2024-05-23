import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionGeneralesComponent } from './recepcion-generales.component';

describe('RecepcionGeneralesComponent', () => {
  let component: RecepcionGeneralesComponent;
  let fixture: ComponentFixture<RecepcionGeneralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionGeneralesComponent]
    });
    fixture = TestBed.createComponent(RecepcionGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
