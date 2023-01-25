import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import {UsuarioService} from '../usuario.service';
import { FormControl } from '@angular/forms';
import { usuarioCreacionDTO, usuarioDTO } from '../usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  tipoContacto = new FormControl();
  contactos : {name: string, id: number}[]=[];
  
  constructor(private router: Router, private service: UsuarioService, private formbuilder: FormBuilder) { }
  form: FormGroup;
  @ViewChild('table')
  table: MatTable<any>
  usuarios: usuarioDTO[];
  displayedColumns = ['Id','Nombre','Cargo','Telefono','Correo','TipoContacto'];
  usuario: usuarioCreacionDTO



  @Output()
  ngOnInit(): void {
    this.contactos = [{name:'Contacto Comercial', id: 1}, {name:'Pago de factura', id: 2}, {name:'Representante Legal', id: 3}, {name:'Retiro de mercadería', id:4}];
    this.form = this.formbuilder.group({
      Usuario: [
        ''
      ],
      Nombre: [
        ''
      ],
      Cargo: [
        ''
      ],
      Telefono:[
        ''
      ],
      Correo:[
        ''
      ]


    })
    this.getall();
  }
  save(){
    Swal.fire(
      'Guardado',
      'ok',
      'warning'
    )
    console.log("hola");
  }
  guardarCambios(){
    this.usuario = this.form.value;
    this.usuario.TipoContacto = this.tipoContacto.value.id;
    console.log("hola");
    console.log(this.usuario); 
    this.service.crear(this.usuario)
    .subscribe((respopnses: HttpResponse<boolean>) => {
      
      if (respopnses)
      {
        this.getall();
        Swal.fire(
          'Guardado',
          'ok',
          'warning'
        )
      }
      else{
        Swal.fire(
          'ocurrio un error',
          'reportar al administrador',
          'error'
        )
      }
    })

  }

  getall(){
    this.service.getAll().subscribe((responses: HttpResponse<usuarioDTO[]>) => {
      this.usuarios = responses.body;
      if (this.usuarios == null){
        Swal.fire(
          'An error has ocurred',
          'report to an admin',
          'error'
        )
      }
      console.log(this.usuarios)
  },error=> console.error(error));
  }
}
