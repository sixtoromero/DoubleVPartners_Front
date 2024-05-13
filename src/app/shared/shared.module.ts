import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../modules/material.module';
import { LoadingComponent } from './loading/loading.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    LoadingComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxUiLoaderModule,
    FormsModule
  ]
})
export class SharedModule { }
