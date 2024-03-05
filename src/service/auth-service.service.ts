import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { url } from 'src/app/models/apiUrl';
import { register } from './modeles/models/inscriptionDonateur';
import { user } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  Envoyeremail(email_utilisateur: string) {
    return this.http.post(`${url}/motpasseoubliere`, user);
  }
  getUserInfo(): any {
  }
  image: File | undefined;
  loginAdmin(user: { email: string; password: string; }) {
  }
  isAdmin$ = new BehaviorSubject<boolean>(false);
   isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient, private router: Router ) { }
 register(user: any) {
    return this.http.post(`${url}/InscriptionDonneur`, user);
    // return this.http.post(${url}/login, user).subscribe((reponse:any) => onSuccess(reponse))
 }
  login(user: any) {
    
    return this.http.post(`${url}/loginAdmin`, user).pipe(
      tap((response: any) =>
      {
        this.isAuthenticatedSubject.next(true)
      }
      )
    );
    // return this.http.post(${url}/login, user).subscribe((reponse:any) => onSuccess(reponse))
  }

  loginDonateur(user: any) {
    return this.http.post(`${url}/loginDonateur`, user).pipe(
      tap((response: any) =>
      {
        this.isAuthenticatedSubject.next(true)
      }
      )
    );
  }
  loginStructureDeSante(user: any) {
    return this.http.post(`${url}/loginStructure`, user).pipe(
      tap((response: any) =>
      {
        this.isAuthenticatedSubject.next(true)
      }
      )
    );
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
  debloqueDonneur(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? this.http.put<any>('${api}/{id}', {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }
  


}
