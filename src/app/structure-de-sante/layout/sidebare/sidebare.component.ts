import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';

@Component({
  selector: 'app-sidebare',
  templateUrl: './sidebare.component.html',
  styleUrls: ['./sidebare.component.css']
})
export class SidebareComponent {

  constructor(private authservice: AuthServiceService,private http: HttpClient,private router:Router) {
  }

  // logoutAdmin() {
    
  //   this.authservice.Logout().subscribe((response) => {
  //     console.warn("la reponse ", response);
  //   });
  // }

  logoutAdmin(): void {
    localStorage.removeItem('userOnline');
    localStorage.removeItem('token');
    localStorage.setItem('isAdmin', JSON.stringify(false));
    localStorage.setItem('isDonateur', JSON.stringify(false));
    localStorage.setItem('isStructure', JSON.stringify(false));
    this.router.navigate(['/auth']);
  }
}
