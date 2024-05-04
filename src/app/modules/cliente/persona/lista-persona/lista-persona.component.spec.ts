import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPersonaComponent } from './lista-persona.component';

describe('ListaPersonaComponent', () => {
  let component: ListaPersonaComponent;
  let fixture: ComponentFixture<ListaPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPersonaComponent]
    });
    fixture = TestBed.createComponent(ListaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
