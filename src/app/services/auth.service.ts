import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Auth, signInWithCustomToken, UserCredential } from '@angular/fire/auth'
import { Router } from '@angular/router'
import {
  map,
  merge,
  mergeMap,
  Observable,
  shareReplay,
  Subject,
  tap,
} from 'rxjs'
import { AuthStatus } from 'src'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStatus$!: Observable<AuthStatus>
  public userCredential$!: Observable<UserCredential | null>
  public isLoggedIn$!: Observable<boolean>

  private idToken!: string | null | undefined
  private userName!: string | null | undefined
  private authSubject$: Subject<boolean> = new Subject()
  private authSubjectObservable$ = this.authSubject$.asObservable()
  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {
    this.authStatus$ = this.getAuthStatus$()
    this.userCredential$ = this.authStatus$.pipe(
      mergeMap(async (status) => {
        const customToken = status.customToken as string
        if (!customToken) {
          console.log('not logged in')
          return null
        }
        const auth = this.auth
        const userCredential = await signInWithCustomToken(auth, customToken)
        console.log('logged in')
        return userCredential
      }),
      shareReplay(1)
    )

    const isUserCredentialExits$ = this.userCredential$.pipe(
      map((userCredential) => {
        return userCredential ? true : false
      })
    )
    this.isLoggedIn$ = merge(
      isUserCredentialExits$,
      this.authSubjectObservable$
    )

    this.userCredential$
      .subscribe(async (userCredential) => {
        this.idToken = await userCredential?.user.getIdToken()
        this.userName = userCredential?.user.displayName
      })
  }

  get getIdToken() {
    return this.idToken
  }

  get getUserName() {
    return this.userName
  }

  public getAuthStatus$(): Observable<AuthStatus> {
    return this.http
      .get(`${environment.identityServiceURL}/status`, {
        withCredentials: true,
      })
      .pipe(
        map((response: any) => {
          const status = response.status === 'true' ? true : false
          const customToken = response.customToken
          return { status, customToken }
        }),
        shareReplay(1)
      )
  }

  public doLogOut() {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${environment.identityServiceURL}/logout`, {
          withCredentials: true,
        })
        .subscribe(
          (result) => {
            console.log(result)
            this.logOut()
            resolve(result)
          },
          (error) => reject(error)
        )
    })
  }

  private logOut() {
    this.authSubject$.next(false)
  }
}
