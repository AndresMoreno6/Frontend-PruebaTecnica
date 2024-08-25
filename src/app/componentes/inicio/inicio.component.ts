import { FormsModule } from '@angular/forms';
import { PaisService } from './../../servicios/pais.service';
import { Component } from '@angular/core';
import { Ciudad, Pais } from '../../interfaces/interfaces';
import { PresupuestoComponent } from '../presupuesto/presupuesto.component';
import { RouterLink, Routes } from '@angular/router';
import { DatosCompartidosService } from '../../servicios/datos-compartidos.service';
import { Router } from '@angular/router';
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

  constructor(private paisService: PaisService,
    private datosCompartidos: DatosCompartidosService,
    private router: Router) { }

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
    if (this.selectPais) {
      this.cargarCiudades(this.selectPais.id);
      this.datosCompartidos.setSelectPais(this.selectPais); // Guardar el país seleccionado en el servicio compartido
    } else {
      this.ciudades = [];
    }
    this.selectCiudad = null;
  }

  cargarCiudades(paisId: number): void {
    this.paisService.getCiudadesPorPais(paisId).subscribe(
      (data) => {
        this.ciudades = data;
      },
      (error) => {
        console.error('Error al cargar ciudades:', error);
      }
    );
  }

  siguiente(): void {
    if (this.selectPais && this.selectCiudad) {
      this.datosCompartidos.setSelectCiudad(this.selectCiudad);
      this.router.navigate(["/presupuesto"]);
      console.log(this.selectCiudad);// Guardar la ciudad seleccionada en el servicio compartido
    } else {
      alert('Por favor, selecciona un país y una ciudad antes de continuar.');
    }
  }
}
