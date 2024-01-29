import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/models/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private http: HttpClient) { }
 register(user: any) {
    return this.http.post(`${url}/InscriptionDonneur`, user);
    // return this.http.post(${url}/login, user).subscribe((reponse:any) => onSuccess(reponse))
  }
}
