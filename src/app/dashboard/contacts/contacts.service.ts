import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }
  formSubmitted = false;

  getContacts(id: string) {
    return this.http.post(environment.getContactsUrl, id);
  }

  addContact(id: string, data: any) {
    return this.http.post(environment.addContactUrl, {id: id, data: data});
  }

  editContact(userId: string, contactId: string) {
    return this.http.put(environment.editContactUrl, {userId: userId, contactId: contactId});
  }

  deleteContact(userId: string, contactId: string) {
    let httpParams = new HttpParams().set(userId, userId);
    httpParams.set(contactId, contactId);
    return this.http.delete(environment.deleteContactUrl, {params: httpParams});
  }
}
