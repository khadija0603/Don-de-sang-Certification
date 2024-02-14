import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


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
 createAnnonce(formData: FormData): Observable<any> {
  // Assurez-vous que vous avez le jeton d'authentification valide
  const token = localStorage.getItem('token');
  
  // Ajoutez le jeton d'authentification à l'en-tête de la requête
  const headers = { 'Authorization': `Bearer ${token}` };

  // Effectuez la requête en incluant les en-têtes
  return this.http.post<any>(`${this.apiUrl}/publier`, formData, { headers });
}

  // Lister toutes les annonces
  getAnnonces(): Observable<any> {
    const token = localStorage.getItem('userOnline.token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/listeAnnonces`, { headers });
  }

  // Mettre à jour une annonce
  updateAnnonce(id: number, updatedData: any): Observable<any> {
     const token = localStorage.getItem('userOnline.token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put<any>(`${this.apiUrl}/ModifierAnnonce/${id}`, updatedData, { headers});
  }

  // Supprimer une annonce
  deleteAnnonce(id: number): Observable<any> {
    const token = localStorage.getItem('userOnline.token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete<any>(`${this.apiUrl}/supprimerAnnonce/${id}`,{ headers});
  }
}

  

