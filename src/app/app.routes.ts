import { Routes } from '@angular/router';
import path from 'path';
import { PresupuestoComponent } from './componentes/presupuesto/presupuesto.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

export const routes: Routes = [
{path: 'inicio',component: InicioComponent},
{path: 'presupuesto',component: PresupuestoComponent},
{path: '**', component: InicioComponent}
];
