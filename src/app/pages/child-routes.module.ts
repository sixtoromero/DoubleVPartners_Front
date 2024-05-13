import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from "./dashboard/dashboard.component";
import { PersonasComponent } from './personas/personas.component';


const childRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'personas', component: PersonasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
