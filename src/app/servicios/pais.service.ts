import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad, Pais } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8000/api';

  getPais(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.urlApi}/paises`);
  }


  getCiudadesPorPais(paisId: number): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.urlApi}/paises/${paisId}/ciudades`);
  }


  // getCambioMoneda(presupuesto: number, divisa: string): Observable<any> {
  //   return this.http.post<any>(`${this.urlApi}/cambioMoneda`, { presupuesto, divisa });
  // }

  getCambioMoneda(presupuesto: number, divisa: string): Observable<any> {
    const body = {
      amount: presupuesto,
      currency: divisa
    };

    return this.http.post(`${this.urlApi}/cambioMoneda`, body);

  }

  getClima(ciudad: string): Observable<any>{
    const body ={
      ciudad: ciudad
    }

    return this.http.post(`${this.urlApi}/clima`, body);
  }

  guardarHistorial(data: any): Observable<any> {
    const body = {
      pais_id: data.pais_id,
      ciudad_id: data.ciudad_id,
      presupuesto_cop: data.presupuesto_cop,
      moneda: data.moneda
    };

    return this.http.post(`${this.urlApi}/historial`, body);
  }

}
