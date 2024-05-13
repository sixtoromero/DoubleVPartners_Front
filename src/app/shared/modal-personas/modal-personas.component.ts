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

  public registerForm:FormGroup = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      TipoIdentificacion: ['', Validators.required],
      NumeroIdentificacion: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]]
  });

  tiposIdentificacion = [
    { value: '1', viewValue: 'Cédula de Ciudadanía' },
    { value: '2', viewValue: 'Tarjeta de Identidad' },
    { value: '3', viewValue: 'Pasaporte' }
  ];

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private personService: PersonasService,
    private ref: MatDialogRef<ModalPersonasComponent>) {}

  ngOnInit(): void {
    
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
  }

  closePopup() {
    this.ref.close();
  }

}
