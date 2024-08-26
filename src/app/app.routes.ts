import { Routes } from '@angular/router';
import path from 'path';
import { PresupuestoComponent } from './componentes/presupuesto/presupuesto.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { HistorialComponent } from './componentes/historial/historial.component';

export const routes: Routes = [
{path: 'inicio',component: InicioComponent},
{path: 'presupuesto',component: PresupuestoComponent},
{path: 'resumen/:id',component: ResumenComponent},
{path: 'historial',component: HistorialComponent},
{path: '**', component: InicioComponent}
];


