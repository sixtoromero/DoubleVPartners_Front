import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Statistics } from 'src/app/interfaces/statistics.interface';
import { PersonaModel } from 'src/app/models/personas.model';
import { PersonasService } from 'src/app/services/personas.service';
import { ModalPersonasComponent } from 'src/app/shared/modal-personas/modal-personas.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  personas: PersonaModel[] = [];
  displayedColumns: string[] = ['Identificador', 'Nombres', 'Apellidos', 'TipoIdentificacion','NumeroIdentificacion', 'Email'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private personasService: PersonasService,
    private ngxService: NgxUiLoaderService,
    public dialog: MatDialog){
      this.getPersonas();
    }

    getPersonas(){
      this.personasService.getAll()
      .subscribe({
        next: resp => {
          this.ngxService.stop();
          if (!resp.IsSuccess){
            Swal.fire('Error', resp.Message, 'error');
            return;
          }

          this.personas = resp.Data;

          this.dataSource = new MatTableDataSource<PersonaModel>(this.personas);
          this.dataSource.paginator = this.paginator;

          console.log(this.personas);

          //resp.statisticsData

        },
        error: err => {
          this.ngxService.stop();
          if (err.error.msg == "Token no válido"){
            localStorage.removeItem('doublevpartnerstoken');
            this.router.navigateByUrl('/login');
          }else{
            Swal.fire('Error', err.error.msg, 'error');
          }
        }
      });
    }

    
    openAddRecordModal() {
      const dialogRef = this.dialog.open(ModalPersonasComponent, {
        width: '250px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('El modal fue cerrado');
        //this.placesService.getPlacesByQuery();
      });
    }
}
