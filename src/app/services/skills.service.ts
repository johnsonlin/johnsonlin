import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { SKILLS_API } from '../app.constants';
import { SkillSets } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private http = inject(HttpClient);

  private skillsUrl: string = SKILLS_API;

  getSkills() {
    return this.http.get<SkillSets>(this.skillsUrl).pipe(map((skillsData) => skillsData || {}));
  }
}
