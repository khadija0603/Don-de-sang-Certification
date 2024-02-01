import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnonceDonneurComponent } from './detail-annonce-donneur.component';

describe('DetailAnnonceDonneurComponent', () => {
  let component: DetailAnnonceDonneurComponent;
  let fixture: ComponentFixture<DetailAnnonceDonneurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAnnonceDonneurComponent]
    });
    fixture = TestBed.createComponent(DetailAnnonceDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
