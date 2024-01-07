import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { SKILLS_API } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skillsUrl: string = SKILLS_API;

  constructor(private http: HttpClient) {}

  getSkills() {
    return this.http
      .get(this.skillsUrl)
      .pipe(map((skillsData) => skillsData || {}));
  }
}
