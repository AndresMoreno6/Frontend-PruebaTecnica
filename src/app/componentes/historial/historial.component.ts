import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { consumoApi } from '../../servicios/consumoApi.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [RouterModule, InicioComponent, TranslateModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
historial : any;

constructor(private consumoApi : consumoApi, private translateService: TranslateService){
  this.translateService.setDefaultLang('es');
  this.translateService.use(localStorage.getItem('language') || 'es');
}


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
