import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {
  myHeader: Header = new Header();
  isEditing: boolean = false;
  docId: string = ''; // Guardamos el ID real para poder actualizar luego

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    // Usamos la misma lógica de Skills para encontrar el documento
    this.firestore.collection('header').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Header;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res => {
      if (res.length > 0) {
        this.myHeader = res[0]; // Tomamos el primer registro encontrado
        this.docId = res[0].id || ''; 
        console.log("¡Datos encontrados!", this.myHeader);
      } else {
        console.error("La colección 'header' está VACÍA en Firebase");
      }
    });
  }

  GuardarHeader() {
    if (this.docId) {
      this.firestore.collection('header').doc(this.docId).update({ ...this.myHeader })
        .then(() => {
          this.isEditing = false;
          alert("¡Actualizado con éxito!");
        });
    }
  }
}
