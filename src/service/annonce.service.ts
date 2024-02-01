import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, Subject, tap, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { url } from './modeles/models/apiUrls';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  // annonces$ = new Subject<Annonce[]>(); 

  //   constructor(private http: HttpClient, private router: Router) {}
    
  //     // Liste 
  //     getAlls() : Observable<any>{
  //       return this.http.get<Annonce[]>(`${url}/annonces`);
  //     }
    
  //     // geteById
  //     getById(id: number)
  //     {
  //       return this.http.get<Annonce>(`${url}/annonces/`+ id);
  //     }
      
  //     // Ajouter  
  //     add(annonce : Annonce) {
  //       return this.http.post<{ message: string }>(`${url}/annonces`, annonce);
  //     }
      
  //     // Edition 
  //     edit(id: number, annonce : Annonce) {
  //       return this.http.put<{ message: string }>(`${url}/annonces/` + id, annonce);
  //     }
      
  //     // Suppression
  //     delete(id: number) {
  //       return this.http.delete<{ message: string }>(`${url}/annonces/` + id);
  //     }
}
