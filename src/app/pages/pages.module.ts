import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../modules/material.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';



@NgModule({
  declarations: [
    ProyectosComponent,
    PagesComponent,
    DashboardComponent,
    EstadisticasComponent
  ],
  exports:[
    ProyectosComponent,
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    NgxUiLoaderModule,
    MaterialModule,
  ]
})
export class PagesModule { }
