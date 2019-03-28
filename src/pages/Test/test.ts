import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { LoginModel } from '../../models/login-model';

@Component({
  selector: 'page-Test',
  templateUrl: 'test.html'
})
export class test {
  films: Observable<any>;
  lists: any =[];
  number:any =1;

  login : LoginModel;
  loginAux : any;

  constructor(public navCtrl: NavController, public Http: Http) {
    // this.loginAux.user = "hola";
    // let name = this.login.
  }
  add()
  {
    let item = {Nombre : "Add " + this.number};
    this.lists.push(item);
    this.number +=  1;

  }
  buscarIndiceDeItem(item) {
    var i = 0;
    var final = -1;
    this.lists.forEach(element => {
      i++;
      if (element.Nombre == item.Nombre) {
        //console.log("entramos aqui con i de " + i);
        final = i;

      }
    });
    return final;
  }
  Remove(event, grocery)
  {

    var indiceABorrar = this.buscarIndiceDeItem(grocery);
    if (indiceABorrar != -1) {
      this.lists.splice(indiceABorrar, grocery);
      console.log("borrado con exito");
    }
    console.log(this.lists.length);
  

  }
  showAlert() 
  {

    // this.navCtrl.push(test);
    // let alert = this.alertCtrl.create({
    //   title: 'New Friend!',
    //   subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
    //   buttons: ['OK']
    // });
    // alert.present();
    // this.Http.get('http://backend.47channel.com/SeccionHome/get', {}, {}).
    // .then(data => {
      this.films = this.Http.get('http://backend.47channel.com/SeccionHome/get');
      this.films
      .subscribe(data => {
        console.log('my data: ', data);
        console.log('my data: ', data.Result[0].Id);
        this.lists = data.Result;

        // console.log( data.Result);

      })
    //   console.log(data.status);
    //   console.log(data.data); // data received by server
    //   console.log(data.headers);
  
    // })
    // .catch(error => {
  
    //   console.log(error.status);
    //   console.log(error.error); // error message as string
    //   console.log(error.headers);
  
    // });
    let t ="text";
    console.log('crap');
    alert("texto");
  }

}