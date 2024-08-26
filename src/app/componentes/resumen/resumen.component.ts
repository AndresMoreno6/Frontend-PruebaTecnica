import { Component } from '@angular/core';
import { PresupuestoComponent } from '../presupuesto/presupuesto.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DatosCompartidosService } from '../../servicios/datosCompartidos.service';
import { consumoApi } from '../../servicios/consumoApi.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [PresupuestoComponent, RouterModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {

  historial: any;
  paises: string | undefined;
  ciudades: string | undefined;


  constructor(private router: Router, private route: ActivatedRoute,
    private datosCompartidos: DatosCompartidosService, private consumoApi: consumoApi) {
  }


  ngOnInit(): void {
    //constante para obtener el id de la busqueda realiza y mostrar el resumen
    const historialId = Number(this.route.snapshot.paramMap.get('id'));

    if (!historialId) {
      this.router.navigate(['/inicio']);
    } else {
      //Aqui consumimos esta API para obtener los datos de la ultima busqueda
      this.consumoApi.obtenerHistorial(historialId).subscribe(data => {
        this.historial = data;

        //Aca utilizamos los datos quel usuario habia digitado anteriormente
        //y los habiamos almacenado en un servicio
        const pais = this.datosCompartidos.getSelectPais();
        const ciudad = this.datosCompartidos.getSelectCiudad();

        if (pais) {
          this.paises = pais.nombre;
        } else {
          //Aqui con el pais que almacenamos, lo utilizamos para traer
          //su nombre con la llave foranea de la tabla historial
          this.consumoApi.getPais().subscribe(paises => {
            const paisEncontrado = paises.find(p => p.id === this.historial.pais_id);
            this.paises = paisEncontrado ? paisEncontrado.nombre : 'Desconocido';
          });
        }

        if (ciudad) {
          this.ciudades = ciudad.nombre;
        } else {
          //Aqui con el ciudad que almacenamos, lo utilizamos para traer
          //su nombre con la llave foranea de la tabla historial
          this.consumoApi.getCiudadesPorPais(this.historial.pais_id).subscribe(ciudades => {
            const ciudadEncontrada = ciudades.find(c => c.id === this.historial.ciudad_id);
            this.ciudades = ciudadEncontrada ? ciudadEncontrada.nombre : 'Desconocido';
          });
        }
      });
    }
  }

}

