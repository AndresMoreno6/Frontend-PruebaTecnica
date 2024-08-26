import { consumoApi } from '../../servicios/consumoAPI.service';
import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { Router, RouterModule } from '@angular/router';
import { ResumenComponent } from '../resumen/resumen.component';
import { Ciudad, Historial, Pais } from '../../interfaces/interfaces';
import { DatosCompartidosService } from '../../servicios/datosCompartidos.service';
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
  presupuesto: string | any;
  cambio: any;
  tasaCambio: any;
  clima: any;


  constructor(
    private datosCompartidos: DatosCompartidosService,
    private consumoApi: consumoApi,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.selectedPais = this.datosCompartidos.getSelectPais();
    this.selectedCiudad = this.datosCompartidos.getSelectCiudad();

    if (!this.selectedPais || !this.selectedCiudad) {
      this.router.navigate(['/']);
    }
  }


  //Funcion para consumir el api del backend y guardar la busqueda
  guardar(): void {
    if (this.selectedPais && this.selectedCiudad && this.presupuesto !== null) {
      const data = {
        pais_id: this.selectedPais?.id,
        ciudad_id: this.selectedCiudad?.id,
        presupuesto_cop: this.presupuesto,
        moneda: this.selectedCiudad?.moneda
      };

      this.consumoApi.guardarHistorial(data).subscribe(
        data => {
          console.log('Historial guardado con éxito:', data);
          this.router.navigate(['/resumen', data.id]);
        },
        error => {
          console.error('Error al guardar el historial:', error);
        }
      );
    } else {
      alert('Debes ingresar tu presupuesto')
    }
  }

  //Funcion para consomir la API del cambio de moneda
  conversion(): void {
    this.consumoApi.getCambioMoneda(this.presupuesto, this.selectedCiudad?.moneda).subscribe(data => {
      this.cambio = data;
      // console.log(this.cambio)
    });

    this.consumoApi.getClima(this.selectedCiudad?.nombre).subscribe(data => {
      this.clima = data;
      // console.log(this.clima);
    })


  }
}
