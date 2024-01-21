import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityType } from '../enum/entity-type.enum';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MmFilehandleService {

  constructor(private http:HttpClient) { }

  
  addDocument(payload:{files:FormData,entityId:number,entityType:EntityType}) { // Ensure payload is of type FormData
    console.log("service payload",payload);
    const headers = new HttpHeaders(); // Create HttpHeaders object
    headers.set('Content-Type', 'multipart/form-data'); // Set the Content-Type header
  
    return this.http.post(`${environment.apiUrl}FileOperations/UploadFile?entityid=${payload.entityId}&entityType=${payload.entityType}`, payload.files, { headers: headers });
  }


  getFileReferencesList(payload:any) {
    console.log("fkfdff",payload)
    return this.http.get(`${environment.apiUrl}FileOperations/GetFileReferences`,{params:payload});
  }

  deleteDocuments(id: number) {
    console.log("===== id index",id);
    
    return this.http.delete(`${environment.apiUrl}FileOperations/DeleteFile/${id}`);
  }

}
