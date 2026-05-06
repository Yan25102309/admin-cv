import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Usamos un ID fijo 'perfil' para que siempre sea el mismo documento
  private docId = 'perfil'; 

  constructor(private firestore: AngularFirestore) {}

  // Traer el documento único del header
  getHeader() {
    return this.firestore.collection('header').doc(this.docId).snapshotChanges();
  }

  // Actualizar los datos
  updateHeader(data: any) {
    return this.firestore.collection('header').doc(this.docId).set(data, { merge: true });
  }
}
