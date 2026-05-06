import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminWorkexperienceComponent } from './admin-workexperience/admin-workexperience.component';
import { AdminEducationComponent } from './admin-education/admin-education.component';
import { AdminCertificatesComponent } from './admin-certificates/admin-certificates.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminLanguagesComponent } from './admin-languages/admin-languages.component';
import { AdminInterestsComponent } from './admin-interests/admin-interests.component';

const routes: Routes = [
  { path: 'header', component: AdminHeaderComponent },
  { path: 'workexperience', component: AdminWorkexperienceComponent },
  { path: 'education', component: AdminEducationComponent },
  { path: 'certificates', component: AdminCertificatesComponent },
  { path: 'skills', component: AdminSkillsComponent },
  { path: 'languages', component: AdminLanguagesComponent },
  { path: 'interests', component: AdminInterestsComponent },
  { path: '', redirectTo: '/header', pathMatch: 'full' } // Sugerencia: una ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Solo una vez y con las rutas
  exports: [RouterModule] // Importante exportarlo para que otros módulos lo vean
})
export class AppRoutingModule { }
