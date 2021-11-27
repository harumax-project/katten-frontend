import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from './comopnents/not-found/not-found.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { OnboardingComponent } from './components/onboarding/onboarding.component'
import { AuthGuard } from './guards/auth.guard'
import { LoginGuard } from './guards/login.guard'

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [LoginGuard] },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
