import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { SelfAssessmentComponent } from './self-assessment/self-assessment.component';
import { ProductComponent } from './product/product.component';
import { ResourceComponent } from './resource/resource.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RequestErgoComponent } from './request-ergo/request-ergo.component';
import { ArticleComponent } from './article/article.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ShowReportComponent } from './show-report/show-report.component';
import { SelfAssessmentOfficeComponent } from './self-assessment-office/self-assessment-office.component';
import { SelfAssessmentOfficeReportComponent } from './self-assessment-office-report/self-assessment-office-report.component';
import { ProfileComponent } from './profile/profile.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'selfAssessment', component: SelfAssessmentComponent,  resolve: { data: UserResolver}, pathMatch: 'full'},
  { path: 'product', component: ProductComponent,  resolve: { data: UserResolver}},
  { path: 'resource', component: ResourceComponent,  resolve: { data: UserResolver}},
  { path: 'survey', component: SurveyComponent,  resolve: { data: UserResolver}},
  { path: 'home', component: HomeComponent,  resolve: { data: UserResolver}},
  { path: 'requestErgo', component: RequestErgoComponent,  resolve: { data: UserResolver}},
  { path: 'requestErgo/:id', component: RequestErgoComponent,  resolve: { data: UserResolver}},
  { path: 'article', component: ArticleComponent,  resolve: { data: UserResolver}},
  { path: 'forgotPassword', component: ForgetPasswordComponent},
  { path: 'showReport/:id', component: ShowReportComponent},
  { path: 'selfAssessmentOffice', component: SelfAssessmentOfficeComponent,  resolve: { data: UserResolver}, pathMatch: 'full'},
  { path: 'showOfficeAssessmentReport/:id', component: SelfAssessmentOfficeReportComponent},
  { path:'profile',component:ProfileComponent,  resolve: { data: UserResolver}, pathMatch: 'full'},
  
];
