import { Routes } from '@angular/router';
import path from 'path';
import { PresupuestoComponent } from './componentes/presupuesto/presupuesto.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';

export const routes: Routes = [
{path: 'inicio',component: InicioComponent},
{path: 'presupuesto',component: PresupuestoComponent},
{path: 'resumen',component: ResumenComponent},
{path: '**', component: InicioComponent}
];


