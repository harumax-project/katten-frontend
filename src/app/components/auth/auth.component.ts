import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public authStatus$!: Observable<boolean>
  public loggedIn$!: Observable<boolean>
  public id!: string | null | undefined
  public identityServiceURL = `${environment.identityServiceURL}/login`
  public userName!: string | null | undefined

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authStatus$ = this.authService.authStatus$
    this.loggedIn$ = this.authService.isLoggedIn$
    this.id = this.authService.getIdToken
    // this.userName = this.authService.userCredential?.user.displayName
    console.log(this.id)
  }

  public onClick() {
  }
}
