import { Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectMeetingsComponent } from './pages/ProjectsComponents/project-meetings/project-meetings.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  // 🔐 Login route (no layout)
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // 🧱 Layout-wrapped routes
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employeeList',
        component: EmployeeListComponent,
      },
      {
        path: 'project/:Id',
        component: ProjectComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'projectDetails/:ProjectId',
        component: ProjectDetailsComponent
      },
      {
        path: 'meeting',
        component: ProjectMeetingsComponent
      },
      {
        path:'aboutUs',
        component:AboutUsComponent
      },
      {
        path:'privacyPolicy',
        component:PrivacyPolicyComponent
      },
      {
        path:'termsCondition',
        component:TermsAndConditionsComponent
      }


    ]
  },

  // 🌐 Fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
