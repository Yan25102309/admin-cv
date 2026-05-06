import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  standalone: false,
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent implements OnInit {
  experienceList: any[] = [];
  myExp: any = this.initModel();
  editMode: boolean = false;
  currentId: string | null = null;

  constructor(private firestore: AngularFirestore) {}

  // Definimos el modelo limpio con todos los campos
  initModel() {
    return {
      startDate: '',
      endDate: '',
      location: '',
      position: '',
      company: '',
      accomplishments: ''
    };
  }

  ngOnInit(): void {
    this.firestore.collection('work-experience').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        return {
          id,
          position: data.position || '',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          location: data.location || '',
          company: data.company || data['company '] || '', 
          accomplishments: data.accomplishments || data.accoplishment || data.accomplishment || ''
        };
      }))
    ).subscribe(data => {
      this.experienceList = data;
    });
  }

  AgregarExperiencia() {
    if (this.editMode && this.currentId) {
      this.firestore.collection('work-experience').doc(this.currentId).update(this.myExp)
        .then(() => this.LimpiarFormulario());
    } else {
      this.firestore.collection('work-experience').add(this.myExp)
        .then(() => this.LimpiarFormulario());
    }
  }

  seleccionarExp(item: any) {
    this.myExp = { ...item }; 
    this.currentId = item.id;
    this.editMode = true;
  }

  eliminarExp(id: string) {
    if (confirm('¿Borrar registro?')) {
      this.firestore.collection('work-experience').doc(id).delete();
    }
  }

  LimpiarFormulario() {
    this.myExp = this.initModel();
    this.editMode = false;
    this.currentId = null;
  }
}
