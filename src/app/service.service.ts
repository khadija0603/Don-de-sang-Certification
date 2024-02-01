import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const api = 'your_api_base_url';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  addStructureSante(data: string): Observable<any> {
    return this.http.post<any>(`${api}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(`${api}/login`, data);
  }

  updateStructureSante(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${api}/structure-de-sante/edit/${id}`, data);
  }

  getAllDonateur(): Observable<any[]> {
    return this.http.get<any[]>(`${api}/structure-de-sante/lister`);
  }

  getDonateurById(id: number): Observable<any> {
    return this.http.get<any>(`${api}/structure-de-sante/detail/${id}`);
  }

  activeDeactiveDonateur(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? this.http.put<any>(
      `${api}/structure-de-sante${id}`,
      {},
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }
    ) : of(null);
  }
  logout(): Observable<any> {
    // Implement your logout logic here
    // For example, clearing the access token from localStorage
    localStorage.removeItem('access_token');
    return of(null);
  }
}
