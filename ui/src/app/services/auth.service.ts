import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig,GlobalVariable,NodeApiUrl } from '../globalConfig';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = GlobalVariable.BASE_API_URL;
  baseFolderUrl = GlobalVariable.BASE_FOLDER_URL;
  private loggedin = new BehaviorSubject<boolean>(false);
  public checkedLoggedin = this.loggedin.asObservable();



  constructor(
    private http : HttpClient
  ) { }

  get isLoggedIn(){

    if(localStorage.getItem('user')){
      this.loggedin.next(true);
    }
    
    this.checkedLoggedin.subscribe((res) => {
      console.log(res);
    });
    return this.checkedLoggedin;
  }

adminLogin(userDetail){ console.log(userDetail);
  return this.http.post(this.baseApiUrl+NodeApiUrl.ADMINLOGIN,userDetail)
  .share() //to void multiple request we using share operator
  .map(
    (res : any) => {
      if(res.status == 400){
        console.log('Error login');
        this.loggedin.next(false);
      }else{
        console.log('login success');
        this.loggedin.next(true);
      }
      return res;
    } 
  )

}

public getToken():string{
  return localStorage.getItem('token');
}

}
