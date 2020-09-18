import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { SelfAssessment } from './self-assessment.model';
import { FormBuilder } from '@angular/forms';
import { RequestErgo } from './request-ergo.model';

@Injectable({
  providedIn: 'root'
})
export class RequestErgoService {
  formData: RequestErgo;

  constructor(private firestore: AngularFirestore) { }

  getRequestErgoList() {
    return this.firestore.collection('request-ergo').snapshotChanges();
  }
}
