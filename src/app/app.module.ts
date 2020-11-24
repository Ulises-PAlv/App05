import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';

import { RouterModule } from '@angular/router';

// Importar la clase creada en el archivo app.route.ts
import { routes } from './app.routes';

// ?? Para trabajar con formularios
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// Para trabajar con formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
