import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProyectosComponent } from "./proyectos/proyectos.component";
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";


const childRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'proyectos', component: ProyectosComponent},
    {path: 'estadisticas', component: EstadisticasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
