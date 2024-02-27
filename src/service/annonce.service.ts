import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { url } from './modeles/models/apiUrls';
@Injectable({
  providedIn: 'root'
})

export class AnnonceService {
  // Déclarations variable 
  private apiUrl = 'http://127.0.0.1:8000/api';  // Remplacez cela par l'URL réelle de votre API

  // Injection de dépendances 
  constructor(private http: HttpClient, private route: Router) { }
  
  // Déclaration des methodes 
  // Service pour participé a un don 
  participerAnnonce(id:any) {
    const userOnline = localStorage.getItem('userOnline');
    if (!userOnline) {
      // Gérer le cas où l'utilisateur n'est pas connecté
      console.warn("Utilisateur non connecté");
      return of(); // Retourner un Observable vide
    }   
  const token = JSON.parse(userOnline).token;
    const headers = { 'Authorization': `Bearer ${token}` };
    // console.log('azerty',token);
    return this.http.get<any>(`${this.apiUrl}/FaireDon/${id}`, { headers });
  }
 
  
  // Service pour confirmé un don 
  confirmer(id: any): Observable<any> {
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    console.warn(userOnline)
    const token = userOnline.token;
    console.warn(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('azerty',token);
    return this.http.put<any>(`${this.apiUrl}/confirmerpromesse/${id}`,{}, { headers });
  
  }
  // Service pour annuler une promesse de don 
  annuler(id: any): Observable<any> {
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    console.warn(userOnline)
    const token = userOnline.token;
    console.warn(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('azerty',token);
    return this.http.put<any>(`${this.apiUrl}/annulerpromesse/${id}`,{}, { headers });
  
  }

  // Recuperer la liste des participants
  getParticipants(id:any): Observable<any> {
    // Ajoutez le jeton d'authentification à l'en-tête
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    console.warn(userOnline)
    const token = userOnline.token;
    console.warn(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/ListePromesseDon/${id}`, { headers });
  }
  getPromesseParticipant(): Observable<any> {
    // Ajoutez le jeton d'authentification à l'en-tête
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    console.warn(userOnline)
    const token = userOnline.token;
    console.warn(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/ListePromesseDonConfirmedonateur`, { headers });
  }

  // Récuperer un participant 
   getParticipant(id:any): Observable<any> {
    // Ajoutez le jeton d'authentification à l'en-tête
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}` );

    return this.http.get<any>(`${this.apiUrl}/ListePromesseDon/${id}`, { headers });
  }

  // Créer une annonce 
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

  

