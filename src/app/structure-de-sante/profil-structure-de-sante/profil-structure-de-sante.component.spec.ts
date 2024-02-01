import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilStructureDeSanteComponent } from './profil-structure-de-sante.component';

describe('ProfilStructureDeSanteComponent', () => {
  let component: ProfilStructureDeSanteComponent;
  let fixture: ComponentFixture<ProfilStructureDeSanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilStructureDeSanteComponent]
    });
    fixture = TestBed.createComponent(ProfilStructureDeSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
