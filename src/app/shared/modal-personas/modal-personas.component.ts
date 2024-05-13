import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import Swal from 'sweetalert2'
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-modal-personas',
  templateUrl: './modal-personas.component.html',
  styleUrls: ['./modal-personas.component.css']
})
export class ModalPersonasComponent implements OnInit  {

  
  public formSubmitted = false;
  public inputdata!: any;

  public registerForm!: FormGroup;

  tiposIdentificacion = [
    { value: '1', viewValue: 'Cédula de Ciudadanía' },
    { value: '2', viewValue: 'Tarjeta de Identidad' },
    { value: '3', viewValue: 'Pasaporte' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref: MatDialogRef<ModalPersonasComponent>,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private personService: PersonasService) {}

  ngOnInit(): void {
    this.inputdata = this.data;

    this.registerForm = this.fb.group({
      Identificador: [this.inputdata == null ? 0 : this.inputdata.Identificador],
      Nombres: [this.inputdata == null ? '' : this.inputdata.Nombres, Validators.required],
      Apellidos: [this.inputdata == null ? '' : this.inputdata.Apellidos, Validators.required],
      TipoIdentificacion: [this.inputdata == null ? '' : this.inputdata.TipoIdentificacion, Validators.required],
      NumeroIdentificacion: [this.inputdata == null ? '' : this.inputdata.NumeroIdentificacion, Validators.required],
      Email: [this.inputdata == null ? '' : this.inputdata.Email, [Validators.required, Validators.email]]
    });
  }

  campoNoValidado(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

  guardarPersona() {
    this.formSubmitted = true;

    if (this.registerForm.invalid){
      Swal.fire('warning', 'Todos los campos son obligatorios', 'warning');
      return;
    }

    this.ngxService.start();    

    if (this.registerForm.value['Identificador'] == 0){
      this.personService.insert(this.registerForm.value)
      .subscribe({
        next: resp => {
          this.formSubmitted = false;
          this.ngxService.stop();
          this.registerForm.reset();
          Swal.fire('success', 'Usuario creado exitosamente', 'success');

        },
        error: err => {
          this.ngxService.stop();
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
    }else{
      this.personService.update(this.registerForm.value)
      .subscribe({
        next: resp => {
          this.formSubmitted = false;
          this.ngxService.stop();
          this.registerForm.reset();
          Swal.fire('success', 'Usuario actualizado exitosamente', 'success');

        },
        error: err => {
          this.ngxService.stop();
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
    }
  }

  closePopup() {
    this.ref.close();
  }

}
