import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { test } from '../Test/test';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  films: Observable<any>;
  lists: any =[];
  constructor(public navCtrl: NavController) {
   
  }
  
  showAlert() 
  {

    this.navCtrl.push(test);
    // let alert = this.alertCtrl.create({
    //   title: 'New Friend!',
    //   subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
    //   buttons: ['OK']
    // });
    // alert.present();
    // this.Http.get('http://backend.47channel.com/SeccionHome/get', {}, {}).
    // .then(data => {
      // this.films = this.Http.get('http://backend.47channel.com/SeccionHome/get');
      // this.films
      // .subscribe(data => {
      //   console.log('my data: ', data);
      //   console.log('my data: ', data.Result[0].Id);
      //   this.lists = data.Result;

        // console.log( data.Result);

    //   })
    // //   console.log(data.status);
    // //   console.log(data.data); // data received by server
    // //   console.log(data.headers);
  
    // // })
    // // .catch(error => {
  
    // //   console.log(error.status);
    // //   console.log(error.error); // error message as string
    // //   console.log(error.headers);
  
    // // });
    // let t ="text";
    // console.log('crap');
    // alert("texto");
  }

}
