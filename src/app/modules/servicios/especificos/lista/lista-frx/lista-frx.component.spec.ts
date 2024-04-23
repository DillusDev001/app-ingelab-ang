import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFrxComponent } from './lista-frx.component';

describe('ListaFrxComponent', () => {
  let component: ListaFrxComponent;
  let fixture: ComponentFixture<ListaFrxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaFrxComponent]
    });
    fixture = TestBed.createComponent(ListaFrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
