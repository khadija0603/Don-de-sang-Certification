import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { url } from 'src/app/models/apiUrl';
import { register } from './modeles/models/inscriptionDonateur';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  getUserInfo(): any {
  }
  image: File | undefined;
  loginAdmin(user: { email: string; password: string; }) {
  }

  isAdmin$ = new BehaviorSubject<boolean>(false);
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router ) { }
 register(user: any) {
    return this.http.post(`${url}/InscriptionDonneur`, user);
    // return this.http.post(${url}/login, user).subscribe((reponse:any) => onSuccess(reponse))
 }
  login(user: any) {
    
    return this.http.post(`${url}/loginAdmin`, user);
    // return this.http.post(${url}/login, user).subscribe((reponse:any) => onSuccess(reponse))
  }

  loginDonateur(user: any) {
    return this.http.post(`${url}/loginDonateur`, user);
  }
  loginStructureDeSante(user: any) {
    return this.http.post(`${url}/loginStructure`, user);
  }
  isAuthenticated: boolean = false;

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
  // methode pour lister
  listerdonateur(): Observable<any> {
    const accessToken = localStorage.getItem('token');

    return accessToken
      ? this.http.get<any>(`${url}/listeDonateur`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }
  // bloque(id: number): Observable<any> {
  //   const accessToken = localStorage.getItem('access_token');
  //   return accessToken ? this.http.put<any>(`${url}/bloquerDonateur/${id}`, {}, {
  //     headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
  //   }) : of(null);
  // }
   bloquerDonneur(id: number): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return accessToken
      ? this.http.put<any>(`${url}/bloquerDonateur/${id}`,{},{
      headers: new HttpHeaders({ 'Authorization' : `Bearer ${accessToken}`})
    }) : of(null)

  }
  debloque(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? this.http.put<any>('${api}/{id}', {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }
  


}
