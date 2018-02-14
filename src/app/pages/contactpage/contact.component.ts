import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import {ContactService} from './contact.service';
import {ContactInfoModel} from '../../models/contact-info.model';
import { SendMessage } from '../../actions/contact';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contact.component.html',
  providers: [
    ContactService
  ]
})
export class ContactpageComponent implements OnInit {
  messageSending$: Observable<boolean>;
  messageSent$: Observable<boolean>;
  messageSendError$: Observable<string>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.messageSending$ = this.store.select('contact').pipe(map(state => state.messageSending));
    this.messageSent$ = this.store.select('contact').pipe(map(state => state.messageSent));
    this.messageSendError$ = this.store.select('contact').pipe(map(state => state.messageSendError));
  }

  submitForm(formData: ContactInfoModel) {
    this.store.dispatch(new SendMessage(formData));
  }
}
