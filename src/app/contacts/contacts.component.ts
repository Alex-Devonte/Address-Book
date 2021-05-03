import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactList = [
    {firstName: "John", lastName: "Doe", profilePicUrl: "somePath"},
    {firstName: "Jdfsdfsdfsdfsfsfohnny", lastName: "Doe", profilePicUrl: "somePath2"},
    {firstName: "Jon", lastName: "Doe", profilePicUrl: "somePath3"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
