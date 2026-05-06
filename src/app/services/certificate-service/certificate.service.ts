import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Certificates } from '../../models/certificate/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {

  constructor(private firestore: AngularFirestore) { }

  // Crea un nuevo registro
  saveCertificado(certificado: Certificates): Promise<any> {
    return this.firestore.collection('certificates').add(certificado);
  }

  // Obtiene los datos en tiempo real
  getCertificados(): Observable<any> {
    return this.firestore.collection('certificates').snapshotChanges();
  }

  // Actualiza un registro existente
  updateCertificado(id: string, data: any): Promise<any> {
    return this.firestore.collection('certificates').doc(id).update(data);
  }

  // Borra un registro
  deleteCertificado(id: string): Promise<any> {
    return this.firestore.collection('certificates').doc(id).delete();
  }
}
