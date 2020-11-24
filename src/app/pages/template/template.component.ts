import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/service/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    pais: '',
    genero: 'f'
  };

  Countries: any[] = []; 

  constructor(private cs: CountriesService) { }

  ngOnInit(): void {
    this.cs.getCountries().subscribe( data => {
      this.Countries = data;

      // Agregar opcion default
      this.Countries.unshift({
        name: '[Seleccione un pais]',
        code: ''
      });

      console.log(this.Countries);
    });
  }

  // ** FUNCIONES NUEVAS
  enviar(form: NgForm) {
    console.log(form);

    if(form.invalid){
      Object.values(form.controls).forEach( control => control.markAllAsTouched());
    }
  }

}
