import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent implements OnInit {

  languagesList: Languages[] = [];
  editMode: boolean = false;
  
  myLanguage: Languages = {
    idioma: '',
    nivelPorcentaje: 0,
    nivelTexto: ''
  };

  constructor(private _languagesService: LanguagesService) { }

  ngOnInit(): void {
    this.obtenerIdiomas();
  }

  obtenerIdiomas() {
    this._languagesService.getLanguages().subscribe((data: any) => {
      this.languagesList = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        } as Languages;
      });
    });
  }

  AgregarIdioma() {
    if (this.myLanguage.idioma === '' || this.myLanguage.nivelTexto === '') {
      alert('Por favor, completa el nombre del idioma y su nivel.');
      return;
    }

    if (this.editMode && this.myLanguage.id) {
      this._languagesService.updateLanguage(this.myLanguage.id, this.myLanguage).then(() => {
        this.LimpiarFormulario();
      });
    } else {
      this._languagesService.saveLanguage(this.myLanguage).then(() => {
        this.LimpiarFormulario();
      }).catch(error => console.error(error));
    }
  }

  seleccionarIdioma(lang: Languages) {
    this.editMode = true;
    this.myLanguage = { ...lang };
  }

  deleteLanguage(id: any) {
    if (id && confirm('¿Eliminar este idioma?')) {
      this._languagesService.deleteLanguage(id).then(() => {
        console.log('Idioma eliminado');
      });
    }
  }

  LimpiarFormulario() {
    this.editMode = false;
    this.myLanguage = {
      idioma: '',
      nivelPorcentaje: 0,
      nivelTexto: ''
    };
  }
}
