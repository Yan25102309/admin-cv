import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  constructor(private firestore: AngularFirestore) { }

  saveInterest(interest: Interests): Promise<any> {
    return this.firestore.collection('interests').add(interest);
  }

  getInterests(): Observable<any> {
    return this.firestore.collection('interests').snapshotChanges();
  }

  updateInterest(id: string, data: any): Promise<any> {
    return this.firestore.collection('interests').doc(id).update(data);
  }

  deleteInterest(id: string): Promise<any> {
    return this.firestore.collection('interests').doc(id).delete();
  }
}
