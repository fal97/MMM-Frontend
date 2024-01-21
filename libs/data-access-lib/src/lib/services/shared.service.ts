import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
   private sharedDataSubject = new BehaviorSubject<boolean>(true);

   sharedData$ = this.sharedDataSubject.asObservable();

  constructor() {
    // You can initialize sharedData with an initial value if needed
    // this.sharedDataSubject.next(true); // Initial value (optional)
  }

  // Function to update sharedData
  updateSharedData(newValue: boolean) {
    this.sharedDataSubject.next(newValue);
  }
}