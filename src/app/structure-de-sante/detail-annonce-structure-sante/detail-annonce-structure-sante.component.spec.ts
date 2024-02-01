import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnonceStructureSanteComponent } from './detail-annonce-structure-sante.component';

describe('DetailAnnonceStructureSanteComponent', () => {
  let component: DetailAnnonceStructureSanteComponent;
  let fixture: ComponentFixture<DetailAnnonceStructureSanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAnnonceStructureSanteComponent]
    });
    fixture = TestBed.createComponent(DetailAnnonceStructureSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
