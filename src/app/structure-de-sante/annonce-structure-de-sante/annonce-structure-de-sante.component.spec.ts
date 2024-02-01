import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceStructureDeSanteComponent } from './annonce-structure-de-sante.component';

describe('AnnonceStructureDeSanteComponent', () => {
  let component: AnnonceStructureDeSanteComponent;
  let fixture: ComponentFixture<AnnonceStructureDeSanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceStructureDeSanteComponent]
    });
    fixture = TestBed.createComponent(AnnonceStructureDeSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
