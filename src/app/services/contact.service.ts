import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { SEND_MESSAGE_API } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  private sendMessageUrl: string = SEND_MESSAGE_API;

  sendMessage(from: string, email: string, message: string) {
    return this.http.post(this.sendMessageUrl, { from, email, message });
  }
}
