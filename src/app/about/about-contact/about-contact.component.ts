import { Component, OnInit } from '@angular/core';
import { ContactForm } from './contact-form.model';
import { Router } from '@angular/router';
import { MessagesService } from './../../services/messages/messages.service';

@Component({
  selector: 'app-about-contact',
  templateUrl: './about-contact.component.html',
  styleUrls: ['./about-contact.component.css']
})
export class AboutContactComponent implements OnInit {

  formIsValid = true;
  errorMessage;
  regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private messagesService: MessagesService, private router: Router) { }

  ngOnInit() {
  }

  createQuestion(data: ContactForm){
    //name check
    if (data.name === undefined) {
      this.formIsValid = false;
      this.errorMessage = 'Please enter a name.';
    } else if (data.name.length < 4) {
      this.formIsValid = false;
      this.errorMessage = 'Your name must be atleast 4 symbols long!';
    }

    //mail check
    if (data.email === undefined) {
      this.formIsValid = false;
      this.errorMessage = 'Please enter an email.';
    } else if (!data.email.match(this.regexMail)) {
      this.formIsValid = false;
      this.errorMessage = 'Email is not in the correct format!';
    }

    //message check
    if (data.message === undefined) {
      this.formIsValid = false;
      this.errorMessage = 'Please enter your message.';
    } else if (data.message.length < 12) {
      this.formIsValid = false;
      this.errorMessage = 'Your message must be atleast 14 symbols long!';
    }

    if(this.formIsValid){
      this.errorMessage = 'Thank you for your message!';
      this.router.navigate(['/home']);
      return this.messagesService.insertMessage(data)
      .subscribe(()=>
        //this.router.navigate(['/home'])
      (err) => {
        console.log(err);
      });
    }
  }
}
