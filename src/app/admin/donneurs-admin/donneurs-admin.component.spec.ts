import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneursAdminComponent } from './donneurs-admin.component';

describe('DonneursAdminComponent', () => {
  let component: DonneursAdminComponent;
  let fixture: ComponentFixture<DonneursAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonneursAdminComponent]
    });
    fixture = TestBed.createComponent(DonneursAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
