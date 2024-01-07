import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RECAPTCHA_KEY } from '../../app.constants';
import { ContactInfo } from '../../models/contact-info.model';

@Component({
  selector: 'jl-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  contactInfo: ContactInfo = new ContactInfo();
  reCaptchaKey = RECAPTCHA_KEY;
  @Input() submitPending: boolean | null = false;
  @Input() submitSuccessful: boolean | null = false;
  @Input() submitError: any;
  @Output() formSubmit = new EventEmitter();

  submitForm(contactForm: NgForm) {
    if (contactForm.valid) {
      this.formSubmit.emit(this.contactInfo);
    }
  }
}
