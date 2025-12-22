import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RECAPTCHA_KEY } from '../../app.constants';
import { ContactInfo } from '../../models/contact-info.model';

@Component({
  selector: 'jl-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [
    MatIcon,
    FormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class ContactFormComponent {
  contactInfo: ContactInfo = new ContactInfo();
  reCaptchaKey = RECAPTCHA_KEY;
  readonly submitPending = input<boolean | null>(false);
  readonly submitSuccessful = input<boolean | null>(false);
  readonly submitError = input<string | null>();
  @Output() formSubmit = new EventEmitter();

  submitForm(contactForm: NgForm) {
    if (contactForm.valid) {
      this.formSubmit.emit(this.contactInfo);
    }
  }
}
