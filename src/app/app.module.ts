import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SelfAssessmentComponent } from './self-assessment/self-assessment.component';
import { ProductComponent } from './product/product.component';
import { ResourceComponent } from './resource/resource.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RequestErgoComponent } from './request-ergo/request-ergo.component';
import { DragDropDirective } from './drag-drop.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  StorageBucket
} from "@angular/fire/storage";
import {APP_BASE_HREF} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';

// Import your library
import { OwlModule } from 'ngx-owl-carousel';
import { ShowReportComponent } from './show-report/show-report.component';
import { SelfAssessmentOfficeComponent } from './self-assessment-office/self-assessment-office.component';
import { SelfAssessmentOfficeReportComponent } from './self-assessment-office-report/self-assessment-office-report.component';
import { ProfileComponent } from './profile/profile.component';
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    SelfAssessmentComponent,
    ProductComponent,
    ResourceComponent,
    SurveyComponent,
    HomeComponent,
    RequestErgoComponent,
    DragDropDirective,
    NavbarComponent,
    FooterComponent,
    ArticleComponent,
    ForgetPasswordComponent,
    ShowReportComponent,
    SelfAssessmentOfficeComponent,
    SelfAssessmentOfficeReportComponent,
    ProfileComponent,
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig,routerOptions),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
   ,AngularFireStorageModule,
   HttpClientModule,FormsModule,
   OwlModule
   
   
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/'},AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
