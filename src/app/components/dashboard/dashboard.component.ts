import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public userName!: string | null | undefined
  public isLoggedIn$!: Observable<boolean>
  public id!: string | null | undefined

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName
    this.isLoggedIn$ = this.authService.isLoggedIn$
  }

  public onClickLogout() {
    this.authService.doLogOut().then(() => window.location.reload())
  }

  public onClick() {
    this.id = this.authService.getIdToken
  }
}
