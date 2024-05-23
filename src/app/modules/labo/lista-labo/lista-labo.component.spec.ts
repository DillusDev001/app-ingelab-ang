import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLaboComponent } from './lista-labo.component';

describe('ListaLaboComponent', () => {
  let component: ListaLaboComponent;
  let fixture: ComponentFixture<ListaLaboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaLaboComponent]
    });
    fixture = TestBed.createComponent(ListaLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
