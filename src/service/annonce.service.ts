import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { url } from './modeles/models/apiUrls';


@Injectable({
  providedIn: 'root'
})

export class AnnonceService {
  // publier: any;
  // annonce$() {
  // }
  private apiUrl = 'http://127.0.0.1:8000/api';  // Remplacez cela par l'URL réelle de votre API
  constructor(private http: HttpClient, private route:Router ) {}

  // Créer une annonce
 createAnnonce(annonce : any): Observable<any> {
  // Assurez-vous que vous avez le jeton d'authentification valide
  const token = localStorage.getItem('token');
  
  // Ajoutez le jeton d'authentification à l'en-tête de la requête
  const headers = { 'Authorization': `Bearer ${token}` };

  // Effectuez la requête en incluant les en-têtes
  return this.http.post<any>(`${this.apiUrl}/publier`, annonce,{ headers });
}

  // Lister toutes les annonces
  getAnnonces(): Observable<any> {
    const token = localStorage.getItem('userOnline.token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/listeAnnonces`, { headers });
  }

  // Mettre à jour une annonce
  updateAnnonce(id: number, annonce : any): Observable<any> {
   
    const accessToken = localStorage.getItem('token');
    return accessToken
      ? this.http.post<any>(`${url}/modifierAnnonce/${id}`, annonce,{
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        }): of(null);
  
  }

  // Supprimer une annonce
  deleteAnnonce(id: number): Observable<any> {

    const accessToken = localStorage.getItem('token');
    return accessToken
      ? this.http.get<any>(`${url}/supprimerAnnonce/${id}`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        }): of(null);
    // const token = localStorage.getItem('userOnline.token');
    // const headers = { 'Authorization': `Bearer ${token}` };
    // return this.http.delete<any>(`${this.apiUrl}/supprimerAnnonce/${id}`,{ headers});
  }
}

  

