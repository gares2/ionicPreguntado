import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WelcomePage } from '../Welcome/welcome';
import { LoginService } from '../../services/login-service';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
  providers:[LoginService]
})
export class RegistrarPage {
  reg: any ={email :"", password:"", confirmPassword:"", nickName:""};
  errors: any =[];
  datos: any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public Http:Http , private loginService : LoginService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }
  Registrar() 
  {
    alert("User prueba2:" + this.reg.email + "Password prueba 2: " + this.reg.password );
    //var url = 'http://localhost:56782/Account/RegisterMobile';
    // let postData = new FormData();
    // postData.append('usuario', 'test');
    // this.Http.post(url, this.reg)
    this.loginService.doRegister(this.reg)
    .subscribe( res => {
      console.log(res);
      let data = res.json();
      console.log(data);
      
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
    });

  }
}
