import { Inject, Injectable } from '@angular/core'
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthProviderService {
  private auth: Auth
  private sessionIdToken!: string | undefined
  constructor(private authService: AuthService) {
    this.auth = authService.angularAuth
  }
  public async googleSignIn() {
    //Googleプロバイダオブジェクトのインスタンスを作成する
    const googleProvider = new GoogleAuthProvider()
    //ユーザーの認証情報をゲットする
    await signInWithRedirect(this.auth, googleProvider)
    await getRedirectResult(this.auth).then(async (userCredential) => {
      const sessionToken = await userCredential?.user.getIdToken()
      if (sessionToken) {
        this.authService.createSession$(sessionToken)
      }
    })

    // console.log(sessionIdToken)
    // if(!sessionIdToken) return
    // this.authService.createSession$(sessionIdToken)
  }

  public async getSessionIdToken() {
    const idToken = await getRedirectResult(this.auth).then(
      (userCredential) => {
        return userCredential?.user.getIdToken()
      }
    )
    return idToken
  }
}
