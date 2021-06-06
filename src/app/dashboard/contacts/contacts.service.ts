import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/shared/models/contact-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }
  formSubmitted = false;
  contactList = [new Contact("","","","","","","","","","")];

  getContacts(id: string) {
    return this.http.post(environment.getContactsUrl, id);
  }

  getContact(id: any): Observable<any> {
    return this.http.get(environment.getContactUrl, {params: {id: id}});
  }

  addContact(id: string, data: any) {
    return this.http.post(environment.addContactUrl, {id: id, data: data});
  }

  editContact(contactId: string, updatedData: any) {
    return this.http.put(environment.editContactUrl, {id: contactId, data: updatedData });
  }

  deleteContact(contactId: string) {
    return this.http.request('DELETE', environment.deleteContactUrl, {body: contactId, responseType:"text"});
  }
}
