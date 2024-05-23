import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionFrxListaComponent } from './recepcion-frx-lista.component';

describe('RecepcionFrxListaComponent', () => {
  let component: RecepcionFrxListaComponent;
  let fixture: ComponentFixture<RecepcionFrxListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionFrxListaComponent]
    });
    fixture = TestBed.createComponent(RecepcionFrxListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
