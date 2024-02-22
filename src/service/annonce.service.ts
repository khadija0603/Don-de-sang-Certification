import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { url } from './modeles/models/apiUrls';



@Injectable({
  providedIn: 'root'
})

export class AnnonceService {
  
  participerAnnonce() {
     const userOnline = localStorage.getItem('userOnline');
  if (!userOnline) {
    // Gérer le cas où l'utilisateur n'est pas connecté
    console.warn("Utilisateur non connecté");
    return of(); // Retourner un Observable vide
  }   
 const token = JSON.parse(userOnline).token;
  const headers = { 'Authorization': `Bearer ${token}` };
  console.log('azerty',token);
  return this.http.get<any>(`${this.apiUrl}/ListePromesseDon`, { headers });
  }
 
  private apiUrl = 'http://127.0.0.1:8000/api';  // Remplacez cela par l'URL réelle de votre API
  constructor(private http: HttpClient, private route:Router ) {}
  confirmer(id: any): Observable<any> {
    // Ajoutez le jeton d'authentification à l'en-tête
    const headers = new HttpHeaders().set('Authorization', 'Bearer ${token}');
    return this.http.put(`${this.apiUrl}/confirmerpromesse/${id}`, { headers });
  }

  getParticipants(): Observable<any> {
    // Ajoutez le jeton d'authentification à l'en-tête
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}` );

    return this.http.get<any>(`${this.apiUrl}/ListePromesseDon/`, { headers });
  }

   getParticipant(id:any): Observable<any> {
    // Ajoutez le jeton d'authentification à l'en-tête
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}` );

    return this.http.get<any>(`${this.apiUrl}/xadyliste/${id}`, { headers });
  }

createAnnonce(annonce: any): Observable<any> {
  const userOnline = localStorage.getItem('userOnline');
  if (!userOnline) {
    console.warn("Utilisateur non connecté");
    return of(); // Retourner un Observable vide
  }

  const token = JSON.parse(userOnline).token;
  const headers = { 'Authorization': `Bearer ${token}` };
  console.log('azerty',token);
  return this.http.post<any>(`${this.apiUrl}/publier`, annonce, { headers });
}


 

  // Lister toutes les annonces
  getAnnonces(): Observable<any> {
    const token = localStorage.getItem('userOnline.token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/listeAnnonces`, { headers });
  }

  // Mettre à jour une annonce
  // updateAnnonce(id: number, annonce : any): Observable<any> {
   
  //   const accessToken = localStorage.getItem('token');
  //   return accessToken
  //     ? this.http.post<any>(`${url}/modifierAnnonce/${id}`, annonce,{
  //         headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
  //       }): of(null);
  
  // }

  updateAnnonce(id: number, annonce: any): Observable<any> {
  const userOnline = localStorage.getItem('userOnline');
  const accessToken = userOnline ? JSON.parse(userOnline).token : null;

  return accessToken
    ? this.http.post<any>(`${url}/modifierAnnonce/${id}`, annonce, {
        headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
      })
    : of(null);
}


  // Supprimer une annonce
  // Dans votre service
deleteAnnonce(id: number): Observable<any> {
  const accessToken = localStorage.getItem('token');
  return accessToken
    ? this.http.delete<any>(`${url}/supprimerAnnonce/${id}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
      })
    : of(null);
}

}

  

