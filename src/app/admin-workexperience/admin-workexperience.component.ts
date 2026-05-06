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
  
  // Variable auxiliar para el manejo del texto en el formulario
  accomplishmentsInput: string = '';

  constructor(private firestore: AngularFirestore) {}

  initModel() {
    return {
      startDate: '',
      endDate: '',
      location: '',
      position: '',
      company: '',
      accomplishments: [] // Ahora es un arreglo vacío por defecto
    };
  }

  ngOnInit(): void {
    this.firestore.collection('work-experience').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        // METODO DE SEGURIDAD: Normalizamos los logros. 
        // Si es un arreglo lo dejamos tal cual, si es string lo metemos en un arreglo, 
        // si no existe usamos arreglo vacío.
        let normalizedAccomplishments: string[] = [];
        const rawData = data.accomplishments || data.accoplishment || data.accomplishment || [];
        
        if (Array.isArray(rawData)) {
          normalizedAccomplishments = rawData;
        } else if (typeof rawData === 'string' && rawData.trim() !== '') {
          normalizedAccomplishments = [rawData];
        }

        return {
          id,
          position: data.position || '',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          location: data.location || '',
          company: data.company || data['company '] || '',
          accomplishments: normalizedAccomplishments
        };
      }))
    ).subscribe(data => {
      this.experienceList = data;
    });
  }

  AgregarExperiencia() {
    // Convertimos el texto del textarea en un arreglo real antes de enviar a Firebase
    this.myExp.accomplishments = this.accomplishmentsInput.split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    if (this.editMode && this.currentId) {
      this.firestore.collection('work-experience').doc(this.currentId).update(this.myExp)
        .then(() => this.LimpiarFormulario());
    } else {
      this.firestore.collection('work-experience').add(this.myExp)
        .then(() => this.LimpiarFormulario());
    }
  }

  seleccionarExp(item: any) {
    this.currentId = item.id;
    // Creamos una copia para no modificar la lista directamente
    this.myExp = { ...item };
    
    // Convertimos el arreglo de Firebase en texto separado por comas para el input
    if (Array.isArray(item.accomplishments)) {
      this.accomplishmentsInput = item.accomplishments.join(', ');
    } else {
      this.accomplishmentsInput = item.accomplishments || '';
    }
    
    this.editMode = true;
  }

  eliminarExp(id: string) {
    if (confirm('¿Borrar registro?')) {
      this.firestore.collection('work-experience').doc(id).delete();
    }
  }

  LimpiarFormulario() {
    this.myExp = this.initModel();
    this.accomplishmentsInput = ''; // Limpiamos el texto auxiliar
    this.editMode = false;
    this.currentId = null;
  }
}
