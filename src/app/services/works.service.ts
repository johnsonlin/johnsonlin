import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WORKS_API } from '../app.constants';
import { Work } from '../models/work.model';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  private http = inject(HttpClient);

  private worksUrl: string = WORKS_API;

  getWorks(): Observable<Work[]> {
    return this.http.get<{ posts: Work[] }>(this.worksUrl).pipe(map((response) => response.posts));
  }
}
