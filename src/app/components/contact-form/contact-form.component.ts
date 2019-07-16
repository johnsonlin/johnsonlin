import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CAPTCHA_KEY } from '../../app-constants';
import { ContactInfoModel } from '../../models/contact-info.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent {
  contactInfo: ContactInfoModel = new ContactInfoModel();
  submitting = false;
  captcha: any;
  captchaKey = CAPTCHA_KEY;
  @Input() submitSuccessful = false;
  @Input() submitError: any;
  @Output() formSubmit = new EventEmitter();

  submitForm(contactForm: NgForm) {
    if (contactForm.valid) {
      this.submitting = true;
      this.formSubmit.emit(this.contactInfo);
    }
  }
}
