import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { Router, RouterModule } from '@angular/router';
import { ResumenComponent } from '../resumen/resumen.component';
import { Ciudad, Historial, Pais } from '../../interfaces/interfaces';
import { DatosCompartidosService } from '../../servicios/datosCompartidos.service';
import { FormsModule } from '@angular/forms';
import { consumoApi } from '../../servicios/consumoApi.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [InicioComponent, RouterModule, ResumenComponent, FormsModule, TranslateModule],
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
    private router: Router, private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('es');
    this.translateService.use(localStorage.getItem('language') || 'es');
  }


  ngOnInit(): void {
    this.selectedPais = this.datosCompartidos.getSelectPais();
    this.selectedCiudad = this.datosCompartidos.getSelectCiudad();

    if (!this.selectedPais || !this.selectedCiudad) {
      this.router.navigate(['/']);
    }
  }


  //Funcion para consumir el api del backend y guardar la busqueda
  guardar(): void {
    if (this.presupuesto != null) {

      if (this.selectedPais && this.selectedCiudad) {
        const data = {
          pais_id: this.selectedPais?.id,
          ciudad_id: this.selectedCiudad?.id,
          presupuesto_cop: this.presupuesto,
          moneda: this.selectedCiudad?.moneda
        };

        this.consumoApi.guardarHistorial(data).subscribe(
          data => {
            this.router.navigate(['/resumen', data.id]);
          },
          error => {
            console.error('Error al guardar el historial:', error);
          }
        );
      }
    }
    else {
      alert('Ingrese su presupuesto');
    }
  }

  //Funcion para consomir la API del cambio de moneda
  conversion(): void {
    if (this.presupuesto != null) {

      this.consumoApi.getCambioMoneda(this.presupuesto, this.selectedCiudad?.moneda).subscribe(data => {
        this.cambio = data;
      });

      //consumo de la API para el clima
      this.consumoApi.getClima(this.selectedCiudad?.nombre).subscribe(data => {
        this.clima = data;
      });
    }


  }
}
