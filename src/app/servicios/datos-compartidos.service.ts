import { Injectable } from '@angular/core';
import { Ciudad, Pais } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  selectPais: Pais | null = null;
  selectCiudad: Ciudad | null = null;

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




}
