import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  constructor(private _http: HttpClient) { }

  getCountries() {
    return this._http.get('https://restcountries.eu/rest/v2/lang/es').pipe( map((resp:any[]) =>
      resp.map(pais => ({ // ** Objeto
          nombre: pais.name,
          code: pais.alpha3Code
        }))
    ));
  }
}
