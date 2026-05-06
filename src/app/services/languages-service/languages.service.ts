import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Languages } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private firestore: AngularFirestore) { }

  saveLanguage(language: Languages): Promise<any> {
    return this.firestore.collection('languajes').add(language);
  }

  getLanguages(): Observable<any> {
    return this.firestore.collection('languajes').snapshotChanges();
  }

  updateLanguage(id: string, data: any): Promise<any> {
    return this.firestore.collection('languajes').doc(id).update(data);
  }

  deleteLanguage(id: string): Promise<any> {
    return this.firestore.collection('languajes').doc(id).delete();
  }
}
