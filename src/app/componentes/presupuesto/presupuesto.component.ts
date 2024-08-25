import { PaisService } from './../../servicios/pais.service';
import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { Router, RouterModule } from '@angular/router';
import { ResumenComponent } from '../resumen/resumen.component';
import { Ciudad, Historial, Pais } from '../../interfaces/interfaces';
import { DatosCompartidosService } from '../../servicios/datos-compartidos.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [InicioComponent, RouterModule, ResumenComponent, FormsModule],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css'
})
export class PresupuestoComponent {
  selectedPais: Pais | null = null;
  selectedCiudad: Ciudad | any;

  // presupuesto: Historial[] = [];
  presupuesto: string | any;
  cambio: any;
  tasaCambio: any;
  clima: any;

  constructor(
    private datosCompartidos: DatosCompartidosService,
    private paisesService: PaisService,
    // private historialService: HistorialService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.selectedPais = this.datosCompartidos.getSelectPais();
    this.selectedCiudad = this.datosCompartidos.getSelectCiudad();

    if (!this.selectedPais || !this.selectedCiudad) {
      this.router.navigate(['/']);
    }
  }


  guardar(): void {
    if (this.selectedPais && this.selectedCiudad && this.presupuesto !== null) {
      const data = {
        pais_id: this.selectedPais?.id,
        ciudad_id: this.selectedCiudad?.id,
        presupuesto_cop: this.presupuesto,
        moneda: this.selectedCiudad?.moneda
      };

      this.paisesService.guardarHistorial(data).subscribe(
        response => {
          console.log('Historial guardado con éxito:', response);
          // Realiza cualquier acción adicional si es necesario
        },
        error => {
          console.error('Error al guardar el historial:', error);
        }
      );
    }
  }

  conversion(): void {
    console.log(this.selectedCiudad?.moneda)
    console.log(this.presupuesto)
    console.log('Hola', this.cambio);
    this.paisesService.getCambioMoneda(this.presupuesto, this.selectedCiudad?.moneda).subscribe(data => {
      this.cambio = data;
      console.log(this.cambio)
    });

    this.paisesService.getClima(this.selectedCiudad?.nombre).subscribe(data => {
      this.clima = data;
      console.log(this.clima);
    })


  }
}
