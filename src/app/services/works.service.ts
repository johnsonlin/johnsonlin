import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WORKS_API } from '../app.constants';
import { Work } from '../models/work.model';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  private worksUrl: string = WORKS_API;

  constructor(private http: HttpClient) {}

  getWorks(): Observable<Work[]> {
    return this.http
      .get<Work[]>(this.worksUrl)
      .pipe(map((response: any) => response.posts as Work[]));
  }
}
