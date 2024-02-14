import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private authService: AuthServiceService, private route: Router, private http: HttpClient) { }
  getUserProfile(): any {
    return this.authService.getUserInfo();
  }



  
}


