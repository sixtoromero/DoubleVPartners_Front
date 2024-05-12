import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-geo-project',
  templateUrl: './modal-geo-project.component.html',
  styleUrls: ['./modal-geo-project.component.css']
})
export class ModalGeoProjectComponent implements OnInit {


  descripcion: string = '';
  project!: Project;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref: MatDialogRef<ModalGeoProjectComponent>,
    private ngxService: NgxUiLoaderService,
    private projectService: ProjectService){}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  inputdata: any;


  closePopup(){
    this.ref.close();
  }

  guardarGeo(){

    if (this.descripcion == ""){
      return;
    }

    this.ngxService.start();

    this.project = {
      id: 0,
      descripcion: this.descripcion,
      latitud: this.inputdata.lat,
      longitud: this.inputdata.lng
    };

    this.projectService.postProject(this.project)
      .subscribe({
        next: resp => {
          this.ngxService.stop();
          Swal.fire('success', 'marcador creado exitosamente', 'success');
          this.closePopup();

        },
        error: err => {
          this.ngxService.stop();
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }


}
