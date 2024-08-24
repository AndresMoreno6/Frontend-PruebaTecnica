export interface Pais {
  id: number;
  nombre: string;
}

export interface Ciudad {
  id: number;
  nombre: string;
  pais_id: number;
}
