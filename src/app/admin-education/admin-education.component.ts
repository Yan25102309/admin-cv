import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  standalone: false,
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent implements OnInit {
  educationList: any[] = [];
  btnTxt: string = 'Agregar Educación';
  editMode: boolean = false;
  currentId: string | null = null;

  // Modelo basado en tu HTML
  myEducation: any = {
    institucion: '',
    programa: '',
    modalidad: '',
    estado: '',
    ubicacion: '',
    startDate: '',
    endDate: ''
  };

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    // Escuchamos la colección 'education' (ajusta el nombre si en Firebase es distinto)
    this.firestore.collection('education').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(data => {
      this.educationList = data;
      console.log("Educación cargada:", data);
    });
  }

  // Esta es la función que llama tu botón (click)="AgregarJob()"
  AgregarJob() {
    if (this.editMode && this.currentId) {
      this.firestore.collection('education').doc(this.currentId).update(this.myEducation)
        .then(() => {
          this.LimpiarFormulario();
          alert("Educación actualizada con éxito");
        });
    } else {
      this.firestore.collection('education').add(this.myEducation)
        .then(() => {
          this.LimpiarFormulario();
        });
    }
  }

  // Para cargar los datos en el formulario y modificar
  seleccionarEdu(edu: any) {
    this.myEducation = { ...edu };
    this.currentId = edu.id;
    this.editMode = true;
    this.btnTxt = 'Actualizar Educación';
  }

  deleteJob(id: string) {
    if (confirm('¿Estás segura de eliminar este registro académico?')) {
      this.firestore.collection('education').doc(id).delete();
    }
  }

  LimpiarFormulario() {
    this.myEducation = {
      institucion: '',
      programa: '',
      modalidad: '',
      estado: '',
      ubicacion: '',
      startDate: '',
      endDate: ''
    };
    this.editMode = false;
    this.currentId = null;
    this.btnTxt = 'Agregar Educación';
  }
}
