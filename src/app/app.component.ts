import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PresupuestoComponent } from './componentes/presupuesto/presupuesto.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { HistorialComponent } from './componentes/historial/historial.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent, PresupuestoComponent, RouterModule,
     ResumenComponent ,HistorialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

