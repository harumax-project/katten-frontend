import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { AuthService } from './services/auth.service'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { OnboardingComponent } from './components/onboarding/onboarding.component'
import { AuthComponent } from './components/auth/auth.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { NotFoundComponent } from './comopnents/not-found/not-found.component'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OnboardingComponent,
    AuthComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.dynamic.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
