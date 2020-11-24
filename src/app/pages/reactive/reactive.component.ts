import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // Almacenar nuevo formulario
  form :FormGroup;

  // Getters de los controles
  get validaNombre() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched
  }

  get validaApellido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get validaCorreo() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get validarEstado() {
    return this.form.get('direccion.estado').invalid && this.form.get('direccion.estado').touched
  }

  get validarMunicipio() {
    return this.form.get('direccion.municipio').invalid && this.form.get('direccion.municipio').touched
  }

  constructor(private fb: FormBuilder, private CustomVal: ValidationService) {
    this.createForm();
  }

  // Getters para un FormArray
  get arrayPasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  // Getters (password) personalizados
  get passwd1_Get() {
    return this.form.get('this.passwd1').invalid && this.form.get('this.passwd1').touched;
  }

  get passwd2_Get() {
    const pass1 = this.form.get('passwd1').value;
    const pass2 = this.form.get('passwd2').value;

    return (pass1 === pass2) ? false : true;
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
     // el primer valor ('') represtenta el valor por defecto de cada control, como segundo valor agregamos las validaciones
      nombre: ['', [Validators.required, Validators.minLength(4), this.CustomVal.YameteKudazai]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      passwd1: ['', [Validators.required]],
      passwd2: ['', [Validators.required]],
      direccion: this.fb.group(
        {
          estado: ['', [Validators.required, Validators.minLength(3)]],
          municipio: ['', [Validators.required, Validators.minLength(3)]]
        }
      ),
      pasatiempos: this.fb.array([])
    },
    {
      validators: this.CustomVal.matchPassword('passwd1', 'passwd2')
    });
  }
  // Se pueden insertar validators en los arrays de la clase

  enviar() {
    console.log(this.form);

    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if(control instanceof FormGroup) {
          return Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  newControl() {
    // Agrega elementos al FormArray
    this.arrayPasatiempos.push(this.fb.control('', Validators.required));
  }

  removeControl(id: number) {
    // Borra del FormArray el control seleccionado
    this.arrayPasatiempos.removeAt(id);
  }
}
