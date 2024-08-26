import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad, Historial, Pais } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class consumoApi {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8000/api';

  //Api para obtener todos los paises
  getPais(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.urlApi}/paises`);
  }

  //Api para obtener las ciudades dependiendo los paises
  getCiudadesPorPais(paisId: number): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.urlApi}/paises/${paisId}/ciudades`);
  }

  //Api para los cambio de monedas
  getCambioMoneda(presupuesto: number, divisa: string): Observable<any> {
    const body = {
      amount: presupuesto,
      currency: divisa
    };
    return this.http.post(`${this.urlApi}/cambioMoneda`, body);
  }

  //Api para obtener el clima en grados centigrados
  getClima(ciudad: string): Observable<any> {
    const body = {
      ciudad: ciudad
    }
    return this.http.post(`${this.urlApi}/clima`, body);
  }

  //Metodo para guardar las busquedas
  guardarHistorial(data: any): Observable<any> {
    const body = {
      pais_id: data.pais_id,
      ciudad_id: data.ciudad_id,
      presupuesto_cop: data.presupuesto_cop,
      moneda: data.moneda
    };

    return this.http.post(`${this.urlApi}/busquedas`, body);
  }

  //Metodo para obtener el resumen de la busqueda
  obtenerHistorial(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/historial/${id}`);
  }

  //Metodo para obtener 5 ultimasa busquedas
  historialBusquedas(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.urlApi}/busquedashistorial`);
  }

}
