import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// Ruta corregida: sube dos niveles y entra a models/skills
import { Skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private firestore: AngularFirestore) { }

  saveSkill(skill: Skills): Promise<any> {
    return this.firestore.collection('skills').add(skill);
  }

  getSkills(): Observable<any> {
    return this.firestore.collection('skills').snapshotChanges();
  }

  updateSkill(id: string, data: any): Promise<any> {
    return this.firestore.collection('skills').doc(id).update(data);
  }

  deleteSkill(id: string): Promise<any> {
    return this.firestore.collection('skills').doc(id).delete();
  }
}
