import { Component } from '@angular/core';
import { PresupuestoComponent } from '../presupuesto/presupuesto.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [PresupuestoComponent, RouterModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {

constructor(private router: Router){

}



siguiente(){
  this.router.navigate(['/inicio']);
}

}

