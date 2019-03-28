import { Component } from '@angular/core';
import {NavController, IonicPage, NavParams} from 'ionic-angular';
import { WelcomePage } from '../Welcome/welcome';
import { RegistrarPage } from '../registrar/registrar';
import { urlconfig, Entorno   } from '../../models/urlconfig';
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { LoginService } from '../../services/login-service';
// @IonicPage()
@Component({
  selector: 'page-Login',
  templateUrl: 'login.html',
  providers:[LoginService]
})
export class LoginPage {
  log: any ={user : "", password:""};
  errors: any =[];
  datos: any =[];
  
  constructor
  (
    public navCtrl: NavController,
    public Http: Http,
    public navParams: NavParams,
    public entorno : Entorno,
    private loginService : LoginService
  ) {}

  ionViewWillEnter()
  {
    if (this.navParams.get("error")!= undefined)
    {
    this.errors.push(this.navParams.get("error"));
    }
    else
    {
        let dataStr =  window.localStorage.users_data
        //let dataStr = localStorage.getItem("users_data");
        if (dataStr!=undefined && dataStr!='')
        this.navCtrl.setRoot(WelcomePage);
    }

  }
  Registrar()
  {
    alert("Usted esta por Registrarse")

    this.navCtrl.setRoot(RegistrarPage);
  }

  Login() 
  {
    this.loginService.doLogin(this.log).subscribe(
      res => {
        console.log(res);
        let data = res.json();
        if (data.Error!='' )
        {
            this.errors = data.Error;
        }
        else
        {
          this.errors =[];
          this.datos = data.Result;
          window.localStorage.users_data = JSON.stringify(data.Result);
          this.navCtrl.setRoot(WelcomePage);
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}