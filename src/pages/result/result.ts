import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Guid } from "guid-typescript";
import { LoginPage } from '../Login/login';
import { ScoreService } from '../../services/score-service';
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
  providers:[ScoreService]
})


export class ResultPage {
  public idCategoria: any;
  public preguntas : Observable<any>;
  public model: any = [{Nombre : "", PregId:"", RespSeleccionada:"", UserId:"", catId:"",RespuestaDisponibles:[{Id:"",Nombre:"",esCorrecta:false,color:"blue"}] }];
  public datos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Http:Http, private scoreService:ScoreService) {
    this.idCategoria = navParams.get("firstPassedIdCategoria");
    alert(this.idCategoria);
    this.get();
  }
  get()
  {

    let id = this.idCategoria;
  
    alert(this.idCategoria);
    let dataStr =  window.localStorage.users_data
    //let dataStr = localStorage.getItem("users_data");
    if (dataStr!=undefined)
     this.datos = JSON.parse(dataStr);

    let objStr = JSON.stringify(id);

  //  this.preguntas = this.Http.get('http://localhost:56782/JugarMobile/Result/?usuarioId=' + this.datos.Id +"&tokenId=" + this.datos.token +"&Contenido=" + objStr   );
  //  this.preguntas
   this.scoreService.GetScore(this.datos,objStr)
   .subscribe(res => {
    console.log(res);
    let data = res.json();
     if (data.error!= '' && data.error !=null && data.error != undefined)
     {  
         this.navCtrl.setRoot(LoginPage, {
           error: data.error } );
     }
     else
     {
          if (data.model!=undefined)
          {   this.model = data.model;
              console.log('my model: ', this.model);
          }
          else
          {
              this.navCtrl.push(ResultPage, {
              firstPassedIdCategoria: data.Result, 
            })
          }
      }
     //console.log('my data: ', data);
     //this.model = data.Result;
   });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }


  
}
