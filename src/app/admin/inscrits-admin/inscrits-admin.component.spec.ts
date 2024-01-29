import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritsAdminComponent } from './inscrits-admin.component';

describe('InscritsAdminComponent', () => {
  let component: InscritsAdminComponent;
  let fixture: ComponentFixture<InscritsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscritsAdminComponent]
    });
    fixture = TestBed.createComponent(InscritsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
