import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [InicioComponent, RouterModule],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css'
})
export class PresupuestoComponent {

}
