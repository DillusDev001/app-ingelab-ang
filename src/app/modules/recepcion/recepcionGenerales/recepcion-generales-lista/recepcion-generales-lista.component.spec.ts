import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionGeneralesListaComponent } from './recepcion-generales-lista.component';

describe('RecepcionGeneralesListaComponent', () => {
  let component: RecepcionGeneralesListaComponent;
  let fixture: ComponentFixture<RecepcionGeneralesListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionGeneralesListaComponent]
    });
    fixture = TestBed.createComponent(RecepcionGeneralesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
