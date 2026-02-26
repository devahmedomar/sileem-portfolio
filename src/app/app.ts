import { Component } from '@angular/core';
import { CursorComponent }     from './components/cursor/cursor';
import { NavbarComponent }     from './components/navbar/navbar';
import { HeroComponent }       from './components/hero/hero';
import { AboutComponent }      from './components/about/about';
import { SkillsComponent }     from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent }   from './components/projects/projects';
import { ContactComponent }    from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CursorComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
})
export class App {}
