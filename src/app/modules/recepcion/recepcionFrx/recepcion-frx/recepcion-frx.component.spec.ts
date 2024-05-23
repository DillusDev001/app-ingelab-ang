import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionFrxComponent } from './recepcion-frx.component';

describe('RecepcionFrxComponent', () => {
  let component: RecepcionFrxComponent;
  let fixture: ComponentFixture<RecepcionFrxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionFrxComponent]
    });
    fixture = TestBed.createComponent(RecepcionFrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
