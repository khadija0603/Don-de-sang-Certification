import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDeSanteAdminComponent } from './structure-de-sante-admin.component';

describe('StructureDeSanteAdminComponent', () => {
  let component: StructureDeSanteAdminComponent;
  let fixture: ComponentFixture<StructureDeSanteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructureDeSanteAdminComponent]
    });
    fixture = TestBed.createComponent(StructureDeSanteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
