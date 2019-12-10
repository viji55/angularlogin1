import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,Validators,Validator} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalFormSupporter } from '../../globalConfig';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:any;
  formValid:any=true;
  emailPattern:any = GlobalFormSupporter.emailPattern; 
  invalidlogin:any=false;

  constructor( 
    private http:HttpClient,
    private router:Router,
    private _fb:FormBuilder,
    private authService : AuthService
    ) {
   
   }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.myForm = this._fb.group({
      email : ['',[<any>Validators.required,Validators.pattern(this.emailPattern)]],
      password : ['',[<any>Validators.required]]
    })

    
  }

  loginAdmin(status:boolean,myForm:any){
    if(status){
      this.formValid = true;
      let data = {
        email : myForm.email,
        password : myForm.password
      }
      this.authService.adminLogin(data).subscribe( res => {
          console.log(res);
            if(res['status'] === 200){
              var response = res.item;
              
              localStorage.setItem('user', JSON.stringify({user_id : response[0].id}));
              localStorage.setItem('userId', response[0].id);
              localStorage.setItem('userRole','Admin');
              localStorage.setItem('token', response[0].access_token);
              this.invalidlogin = false;
              //this.router.navigate(['/f/c/home']);
            } else if(res['status'] ===300){
              this.invalidlogin = true;
              this.formValid = false;
            } else {
              this.invalidlogin = false;
              this.formValid = false;
            }
      },
      err=>{

      }
      
      );

    }else{
      this.formValid = false;
    }
  }

}
