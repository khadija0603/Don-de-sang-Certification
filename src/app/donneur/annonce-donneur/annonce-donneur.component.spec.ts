import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceDonneurComponent } from './annonce-donneur.component';

describe('AnnonceDonneurComponent', () => {
  let component: AnnonceDonneurComponent;
  let fixture: ComponentFixture<AnnonceDonneurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceDonneurComponent]
    });
    fixture = TestBed.createComponent(AnnonceDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
