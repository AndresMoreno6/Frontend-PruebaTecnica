import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad, Pais } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8000/api';

  getPais(): Observable<Pais[]>{
    return this.http.get<Pais[]>(`${this.urlApi}/paises`);
  }


  getCiudadesPorPais(paisId: number): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.urlApi}/paises/${paisId}/ciudades`);
  }

}
