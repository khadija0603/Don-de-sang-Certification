import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDonneurComponent } from './profil-donneur.component';

describe('ProfilDonneurComponent', () => {
  let component: ProfilDonneurComponent;
  let fixture: ComponentFixture<ProfilDonneurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilDonneurComponent]
    });
    fixture = TestBed.createComponent(ProfilDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
