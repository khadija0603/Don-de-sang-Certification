import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { url } from './modeles/models/apiUrls';
@Injectable({
  providedIn: 'root'
})
  
export class StructureSanteService {
  verifierChamp(arg0: string, status_message: any, arg2: string) { }
  // updateStructure(structureSelectionner: any, formData: FormData) { }
  image!: File ;
  listerStructure() {}

  private apiUrl = 'http://127.0.0.1:8000/api';  // Remplacez cela par l'URL réelle de votre API
  constructor(private http: HttpClient) { }
  ajoutStructureSante(formData: FormData): Observable<any> {
    // Assurez-vous que l'URL est correcte et que la méthode HTTP appropriée est utilisée
    return this.http.post<any>(`${this.apiUrl}/ajouterStructureSante`, formData);
  }

   getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }
    // methode pour lister
  listerstructures(): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return accessToken
      ? this.http.get<any>(`${url}/listeStructure`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        }): of(null);
  }

 updateStructure(id : number, structure: any): Observable<any> {
    const accessToken = localStorage.getItem('token');

     return accessToken
      ? this.http.post<any>(`${url}/modifierComptestructure/${id}`, structure, {
        headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        }): of(null);
 }
  bloquerStructure(id: number): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return accessToken
      ? this.http.put<any>(`${url}/bloquerStructure/${id}`,{
      headers: new HttpHeaders({ Authorization : `Bearer ${accessToken}`})
    }) : of(null)

  }

  deleteAnnonce(id: number): Observable<any> {

    const accessToken = localStorage.getItem('token');
    return accessToken
      ? this.http.delete<any>(`${url}/supprimerAnnonce/${id}`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        }): of(null);
  }



}
