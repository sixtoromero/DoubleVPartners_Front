import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-personas',
  templateUrl: './modal-personas.component.html',
  styleUrls: ['./modal-personas.component.css']
})
export class ModalPersonasComponent implements OnInit  {

  personForm!: FormGroup;

  tiposIdentificacion = [
    { value: '1', viewValue: 'Cédula de Ciudadanía' },
    { value: '2', viewValue: 'Tarjeta de Identidad' },
    { value: '3', viewValue: 'Pasaporte' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      TipoIdentificacion: ['', Validators.required],
      NumeroIdentificacion: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]]
    });
  }

}
