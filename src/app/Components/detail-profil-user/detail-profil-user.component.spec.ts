import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProfilUserComponent } from './detail-profil-user.component';

describe('DetailProfilUserComponent', () => {
  let component: DetailProfilUserComponent;
  let fixture: ComponentFixture<DetailProfilUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProfilUserComponent]
    });
    fixture = TestBed.createComponent(DetailProfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
