import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Http } from '@angular/http';
//import { LoginModel } from '../../models/login-model';
import { CategoriaPage } from '../categoria/categoria';
@Component({
  selector: 'page-Welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
 
  errors: any =[];
  datos: any = [];

  constructor(public navCtrl: NavController, public Http: Http) 
  {
    let dataStr =  window.localStorage.users_data
      //let dataStr = localStorage.getItem("users_data");
      if (dataStr!=undefined)
    this.datos = JSON.parse(dataStr);
     
  }
  
  Jugar() 
  {
      this.navCtrl.push(CategoriaPage)
  }
//   Jugar() 
//   {
//     alert("User prueba2:" + this.log.user + "Password prueba 2: " + this.log.password );
//     var url = 'http://localhost:56782/Account/LoginMobile';
//     // let postData = new FormData();
//     // postData.append('usuario', 'test');
//     this.Http.post(url, this.log)
//     .subscribe( (data:any) => {
//       console.log(data);
      
//        if (data.Error!='' )
//        {
//           this.errors = data.Error;
//        }
//        else
//        {
//          this.errors =[];
//          this.datos = data.Result;
//          window.localStorage.users_data = JSON.stringify(data.Result);
//        }
//     });

 // }

}