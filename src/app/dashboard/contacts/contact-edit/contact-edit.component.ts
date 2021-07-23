import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/shared/models/contact-model';
import { ContactsService } from '../contacts.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { TokenStorageService } from 'src/app/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactsService, private tokenStorage: TokenStorageService, private modal: NgbModal, private messageService: MessageService) { }

  contactData = [new Contact("","","","",[{id: "", email: "", emailType: ""}],[{id: "", phone: "", phoneType: ""}],"","")];
  imageSrc: any;
  url = environment.uploadUrl;
  myFile: any;
  attachmentData: any;

  modalRef: any;

  emails = [{
    id: 0,
    email: '',
    emailType: ''
  }];

  phones = [{
    id: 0,
    phone: '',
    phoneType: ''
  }];

  ngOnInit(): void {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.emails.pop();
    this.phones.pop();

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      this.contactService.getContact(id).subscribe(res => {
        this.contactData = [new Contact(res[0].contact_id, res[0].first_name, res[0].last_name,
                                        res[0].nickname, res.emailData, res.phoneData, res[0].profile_picture_path, res[0].user_id)];
        
        //Populate arrays with data from database to fill out form inputs utilizing two-way binding
        for (let i = 0; i < this.contactData[0].emailInfo.length; i++) {
          this.emails.push({
            id: +this.contactData[0].emailInfo[i].id,
            email: this.contactData[0].emailInfo[i].email,
            emailType: this.contactData[0].emailInfo[i].emailType
          });
        }

        for (let i = 0; i < this.contactData[0].phoneInfo.length; i++) {
          this.phones.push({
            id: +this.contactData[0].phoneInfo[i].id,
            phone: this.contactData[0].phoneInfo[i].phone,
            phoneType: this.contactData[0].phoneInfo[i].phoneType
          });
        }                                 
      });
    });
  }

  //Access FileList form the File API to show a preview of the user's uploaded image
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
  
  onFileSelected(event: File[]) {
    const file: File = event[0];
    this.myFile = file;
 
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
   }
 
   //ng2-File-Upload
   public uploader: FileUploader = new FileUploader({
     url: this.url,
     disableMultipart: false,
     autoUpload: true,
     itemAlias: 'attachment',
     additionalParameter: {folder_id: this.tokenStorage.getToken().id}
   });
 
   onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
     //success server response
     let data = JSON.parse(response); 
     this.attachmentData = data;
   }

  addEmailField() {
    this.emails.push({
      id: (this.emails.length + 2),
      email: '',
      emailType: ''
    });
  }

  addPhoneField() {
    this.phones.push({
      id: (this.phones.length + 1),
      phone: '',
      phoneType: ''
    });
  }

  openModal(content: any) {
    this.modalRef = this.modal.open(content);
  }

  saveChanges(form: NgForm) {
    const formData = form.value;

    //Set picture path to prevent it from resetting to an empty string
    formData.profilePic = this.contactData[0].path;
    formData.emailGroup = this.emails;
    formData.phoneGroup = this.phones;

    //Add attachment property to the form data to be sent to the server
    formData.attachment = this.attachmentData;

    this.contactService.editContact(this.contactData[0].id, formData).subscribe((res: any) => {
      if (!res.hasErrors) {
        this.messageService.setMessage("Contact edited successfully");
        this.contactService.refreshContactList();
        this.router.navigate(["dashboard"]);
      }
    });
  }

  discardChanges() {
    this.modalRef.close();
    this.router.navigate(["/dashboard"]);
  }
}
