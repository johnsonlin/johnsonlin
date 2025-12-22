import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ContactInfo } from '../../models/contact-info.model';
import { ContactActions } from '../../ngrx/contact/contact.actions';
import {
  selectMessageError,
  selectMessageSending,
  selectMessageSent,
} from '../../ngrx/contact/contact.reducer';

@Component({
  selector: 'jl-contact',
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private store = inject(Store);

  messageSending$!: Observable<boolean>;
  messageSent$!: Observable<boolean>;
  messageSendError$!: Observable<string | null>;

  ngOnInit() {
    this.messageSending$ = this.store.select(selectMessageSending);
    this.messageSent$ = this.store.select(selectMessageSent);
    this.messageSendError$ = this.store.select(selectMessageError);
  }

  submitForm(formData: ContactInfo) {
    this.store.dispatch(ContactActions.sendMessage({ data: formData }));
  }
}
