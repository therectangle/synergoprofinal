import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { SelfAssessment } from './self-assessment.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SelfAssessmentService {
  formData: SelfAssessment;

  constructor(private firestore: AngularFirestore) { }

  getSelfAssessments() {
    return this.firestore.collection('self-assessment').snapshotChanges();
  }
}
