import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent implements OnInit {

  interestsList: Interests[] = [];
  editMode: boolean = false;

  myInterest: Interests = {
    descripcion: '',
    icono: '',
    nombre: '',
    tipo: ''
  };

  constructor(private _interestsService: InterestsService) { }

  ngOnInit(): void {
    this.obtenerIntereses();
  }

  obtenerIntereses() {
    this._interestsService.getInterests().subscribe((data: any) => {
      this.interestsList = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        } as Interests;
      });
    });
  }

  AgregarInteres() {
    if (this.myInterest.nombre === '' || this.myInterest.tipo === '') {
      alert('Nombre y Tipo son obligatorios.');
      return;
    }

    if (this.editMode && this.myInterest.id) {
      this._interestsService.updateInterest(this.myInterest.id, this.myInterest).then(() => {
        this.LimpiarFormulario();
      });
    } else {
      this._interestsService.saveInterest(this.myInterest).then(() => {
        this.LimpiarFormulario();
      }).catch(error => console.error(error));
    }
  }

  seleccionarInteres(interest: Interests) {
    this.editMode = true;
    this.myInterest = { ...interest };
  }

  deleteInterest(id: any) {
    if (id && confirm('¿Eliminar este interés?')) {
      this._interestsService.deleteInterest(id);
    }
  }

  LimpiarFormulario() {
    this.editMode = false;
    this.myInterest = {
      descripcion: '',
      icono: '',
      nombre: '',
      tipo: ''
    };
  }
}
