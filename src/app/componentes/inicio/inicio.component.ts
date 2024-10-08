import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Ciudad, Pais } from '../../interfaces/interfaces';
import { PresupuestoComponent } from '../presupuesto/presupuesto.component';
import { RouterLink, Routes } from '@angular/router';
import { DatosCompartidosService } from '../../servicios/datosCompartidos.service';
import { Router } from '@angular/router';
import { consumoApi } from '../../servicios/consumoApi.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, PresupuestoComponent, RouterLink, TranslateModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  selectPais: Pais | null = null;
  selectCiudad: Ciudad | null = null;

  constructor(private consumoApi: consumoApi,
    private datosCompartidos: DatosCompartidosService,
    private router: Router, private translateService: TranslateService) {
    this.translateService.setDefaultLang('es');
    this.translateService.use(localStorage.getItem('language') || 'es');
  }


  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
    this.translateService.use(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);

    // Aquí puedes recargar o actualizar los países para reflejar la traducción
    this.obtenerPaises();
  }

  ngOnInit(): void {
    this.cargarPaises();
  }


  //funcion para cargar los paises de la base de datos
  cargarPaises(): void {
    this.consumoApi.getPais().subscribe((data) => {
      this.paises = data;
    },
      (error) => {
        console.error('Error al cargar países:', error);
      }
    );
  }

  //funcion para cargar los paises en los select
  obtenerPaises(): void {
    if (this.selectPais) {
      this.cargarCiudades(this.selectPais.id);
      this.datosCompartidos.setSelectPais(this.selectPais); // Guardar el país seleccionado en el servicio compartido
    } else {
      this.ciudades = [];
    }
    this.selectCiudad = null;
  }

  //funcion para cargar las ciudad dependiendeo del pais que se elija
  cargarCiudades(paisId: number): void {
    this.consumoApi.getCiudadesPorPais(paisId).subscribe(
      (data) => {
        this.ciudades = data;
      },
      (error) => {
        console.error('Error al cargar ciudades:', error);
      }
    );
  }

  //funcion para pasar a las siguiente venta, si el usuario selecciona un pais y una cidad
  siguiente(): void {
    if (this.selectPais && this.selectCiudad) {
      this.datosCompartidos.setSelectCiudad(this.selectCiudad); // Guardar la ciudad seleccionada en el servicio compartido
      this.router.navigate(["/presupuesto"]);
    } else {
      alert('Por favor, selecciona un país y una ciudad antes de continuar.');
    }
  }
}
