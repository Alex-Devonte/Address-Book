import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(id: string) {
    return this.http.post(environment.getContactsUrl, {id: id});
  }

  getContact(userId: string, contactId: string) {

  }
}
