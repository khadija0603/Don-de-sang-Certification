import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceAdminComponent } from './annonce-admin.component';
import { DataTablesModule } from 'angular-datatables';

describe('AnnonceAdminComponent', () => {
  let component: AnnonceAdminComponent;
  let fixture: ComponentFixture<AnnonceAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceAdminComponent],
      imports: [DataTablesModule]
    });
    fixture = TestBed.createComponent(AnnonceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
