import { Injectable } from '@angular/core';
import { Ciudad, Historial, Pais } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  selectPais: Pais | null = null;
  selectCiudad: Ciudad | null = null;
  historialId: Historial | null = null;

  constructor() { }

  setSelectPais(pais: Pais): void {
    this.selectPais = pais;
  }

  getSelectPais(): Pais | null {
    return this.selectPais;
  }

  setSelectCiudad(ciudad: Ciudad): void {
    this.selectCiudad = ciudad;
  }

  getSelectCiudad(): Ciudad | null {
    return this.selectCiudad;
  }

  setHistorialId(id: Historial): void {
    this.historialId = id;
  }

  getHistorialId(): Historial | null {
    return this.historialId;
  }


}
