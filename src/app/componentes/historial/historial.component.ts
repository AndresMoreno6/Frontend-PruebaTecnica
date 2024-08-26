import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { consumoApi } from '../../servicios/consumoApi.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [RouterModule, InicioComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
historial : any;

constructor(private consumoApi : consumoApi){}


ngOnInit(): void {
  this.cargarHistorial();
}


//Metodo oara obtener las ultimas 5 busquedas realizadas
cargarHistorial(){
  this.consumoApi.historialBusquedas().subscribe(data =>{
    this.historial = data;
    console.log(this.historial.pais_id);
  })
}

}
