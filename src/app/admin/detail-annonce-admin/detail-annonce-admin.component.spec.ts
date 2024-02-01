import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnonceAdminComponent } from './detail-annonce-admin.component';

describe('DetailAnnonceAdminComponent', () => {
  let component: DetailAnnonceAdminComponent;
  let fixture: ComponentFixture<DetailAnnonceAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAnnonceAdminComponent]
    });
    fixture = TestBed.createComponent(DetailAnnonceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
