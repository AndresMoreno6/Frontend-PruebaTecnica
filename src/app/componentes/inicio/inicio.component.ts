import { FormsModule } from '@angular/forms';
import { PaisService } from './../../servicios/pais.service';
import { Component } from '@angular/core';
import { Ciudad, Pais } from '../../interfaces/interfaces';
import { PresupuestoComponent } from '../presupuesto/presupuesto.component';
import { RouterLink } from '@angular/router';
// import { NgModule } from '@angular/core';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, PresupuestoComponent, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  selectPais: Pais | null = null;
  selectCiudad: Ciudad | null = null;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

cargarPaises(): void {
  this.paisService.getPais().subscribe((data) => {
    this.paises = data;
  },
  (error) => {
    console.error('Error al cargar países:', error);
  }
);
}

  obtenerPaises(): void {
    // this.selectPais = pais;
    // this.selectCiudad = null;
    console.log('País seleccionado (objeto completo):', this.selectPais);
    if (this.selectPais) {
      this.cargarCiudades(this.selectPais.id);
    } else {
      this.ciudades = [];
      console.log(this.ciudades, 'hola')
    }
    this.selectCiudad = null;
  }

  cargarCiudades(paisId: number): void {
    console.log('Cargando ciudades para el país ID:', paisId);
    this.paisService.getCiudadesPorPais(paisId).subscribe(
      (data) => {
        this.ciudades = data;
      },
      (error) => {
        console.error('Error al cargar ciudades:', error);
      }
    );
  }
}
