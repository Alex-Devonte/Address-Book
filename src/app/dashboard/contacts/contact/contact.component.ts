import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/shared/models/contact-model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactsService, private modal: NgbModal) { }
  
  contact = [new Contact("","","","",[{email: "", emailType: ""}],[{phone: "", phoneType: ""}],"","")];
  @Output() close: EventEmitter<any> = new EventEmitter();
  modalRef: any;

  ngOnInit(): void {
    //Allows ngOnInit to be called every time route changes instead of just once when component is created
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.getContact(id);
    })
  }

  getContact(id: any) {
    this.contactService.getContact(id).subscribe(res => {
     this.contact = [new Contact(res[0].contact_id, res[0].first_name, res[0].last_name, res[0].nickname, res.emailData,
                                res.phoneData, res[0].profile_picture_path, res[0].user_id)];
    });
  }

  deleteContact() {
   this.contactService.deleteContact(this.contact[0].id).subscribe(res => {
     this.modalRef.close();
     this.contactService.refreshContactList();
     this.router.navigate(["/dashboard"]);
   });
  }

  openModal(content: any) {
    this.modalRef = this.modal.open(content);
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
}


