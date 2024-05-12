import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../modules/material.module';
import { MapviewComponent } from './mapview/mapview.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BtnMyLocationComponent } from './btn-my-location/btn-my-location.component';
import { AirisLogonComponent } from './airis-logon/airis-logon.component';
import { ModalGeoProjectComponent } from './modal-geo-project/modal-geo-project.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    MapviewComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    AirisLogonComponent,
    ModalGeoProjectComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    MapviewComponent,
    BtnMyLocationComponent,
    AirisLogonComponent
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
