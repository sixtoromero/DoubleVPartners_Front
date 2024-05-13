import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class PersonasComponent implements OnInit {
  personas: PersonaModel[] = [];
  displayedColumns: string[] = ['Identificador', 'Nombres', 'Apellidos', 'TipoIdentificacion','NumeroIdentificacion', 'Email', 'editar'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private personasService: PersonasService,
    private ngxService: NgxUiLoaderService,    
    public dialog: MatDialog){}

  ngOnInit(): void {
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
            Swal.fire('Error', 'Los datos en primera instancia no se cargaron correctamente, presione F5 para continuar.', 'error');            
          }
        }
      });
    }

    
    openAddRecordModal() {
      const dialogRef = this.dialog.open(ModalPersonasComponent, {
        width: '500px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getPersonas();
      });
    }

    openEditRecordModal(element: any){
      const dialogRef = this.dialog.open(ModalPersonasComponent, {
        width: '500px',
        data: element
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getPersonas();
      });
    }

    eliminarPersona(item: any){
      Swal.fire({
        title: `¿Está seguro de eliminar el registro? ${item.Nombres} ${item.Apellidos}`,
        text: "Una vez elimine no podrá revertir los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.personasService.delete(item.Identificador)
          .subscribe({
            next: resp => {              
              this.getPersonas();
              Swal.fire('success', 'Registro eliminado', 'success');
            },
            error: err => {
              this.ngxService.stop();
              Swal.fire('Error', err.error.msg, 'error');
            }
          });
        }
      });
    }
}
