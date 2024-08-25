export interface Pais {
  id: number;
  nombre: string;
}

export interface Ciudad {
  id: number;
  nombre: string;
  pais_id: number;
  moneda: string | undefined;
  simbolo_moneda: string;
}

export interface Historial{
  id: number;
  pais_id: number;
  ciudad_id: number;
  presupuesto_cop: number;
  presupuesto_local: number;
  clima: string;
  fecha: string;
}
