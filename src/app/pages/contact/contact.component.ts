import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ComponentsModule } from '../../components/components.module';
import { ContactInfo } from '../../models/contact-info.model';
import { ContactActions } from '../../ngrx/contact/contact.actions';
import {
  selectMessageError,
  selectMessageSending,
  selectMessageSent,
} from '../../ngrx/contact/contact.reducer';

@Component({
  selector: 'jl-contact',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  messageSending$!: Observable<boolean>;
  messageSent$!: Observable<boolean>;
  messageSendError$!: Observable<unknown>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.messageSending$ = this.store.select(selectMessageSending);
    this.messageSent$ = this.store.select(selectMessageSent);
    this.messageSendError$ = this.store.select(selectMessageError);
  }

  submitForm(formData: ContactInfo) {
    this.store.dispatch(ContactActions.sendMessage({ data: formData }));
  }
}
