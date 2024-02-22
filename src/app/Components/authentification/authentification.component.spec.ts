import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Nécessaire pour les routerLinkActive
import { FormsModule } from '@angular/forms'; // Nécessaire si le composant a un ngModel
import { AuthentificationComponent } from './authentification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AuthentificationComponent', () => {
  let component: AuthentificationComponent;
  let fixture: ComponentFixture<AuthentificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthentificationComponent],
      imports:[FormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
