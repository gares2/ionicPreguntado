import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Guid } from "guid-typescript";
import {ResultPage} from '../result/result';
import { LoginPage } from '../Login/login';
import { JugarService } from '../../services/juego-service';
/**
 * Generated class for the JugarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jugar',
  templateUrl: 'jugar.html',
  providers:[JugarService]
})
export class JugarPage {
  public idCategoria: any;
  public preguntas : Observable<any>;
  public model: any = {Nombre : "", PregId:"", RespSeleccionada:"", UserId:"", catId:"",RespuestaDisponibles:[{Id:"",Nombre:"",esCorrecta:false,color:"blue"}] };
  public datos: any;
 /* Id: "00000000-0000-0000-0000-000000000000"
    Nombre: "Cuanto es tres mas tres"
    PregId: "b749ed78-deb4-bf0c-c9b0-39ebef8066cd"
    RespSeleccionada: "00000RespuestaDisponibles000-0000-0000-0000-000000000000"
    RespuestaDisponibles: (4) [{…}, {…}, {…}, {…}]
    UserId: "9ab74b23-b11c-401f-ab1f-39ec7fa68c28"
    catId: "7a3d6ac0-4f3d-e3e9-f5ed-39ebdefa9799" */
    public RespuestaCorrecta: any="";
  
    get()
    {

     let id = this.idCategoria;
     let dataStr =  window.localStorage.users_data
     //let dataStr = localStorage.getItem("users_data");
     if (dataStr!=undefined)
      this.datos = JSON.parse(dataStr);

      let objStr = JSON.stringify(id);

     alert(this.idCategoria);
    
     this.jugarService.play(this.datos, objStr) //this.Http.get('http://localhost:56782/JugarMobile/play/?usuarioId=' + this.datos.Id +"&tokenId=" + this.datos.token +"&Contenido=" + objStr    );
    // this.preguntas
     .subscribe(res => {
      console.log(res);
      let data = res.json();
       console.log('my data: ', data);
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public Http:Http, public httpClient:HttpClient, private jugarService:JugarService) {

   
    //  alert(this.idCategoria);

    // this.preguntas = this.Http.get('http://localhost:56782/JugarMobile/play/' + id );
    // this.preguntas
    // .subscribe(data => {
    //   console.log('my data: ', data);
    //   this.model = data.model;
    //   console.log('my model: ', this.model);
    //   //console.log('my data: ', data);
    //   //this.model = data.Result;
    // });
    
  }
  ionViewWillEnter()
  {
    this.idCategoria = this.navParams.get("firstPassed");
    //  let id = this.idCategoria;
       this.get();
  }
  esCorrecta(item)
  {
    alert(item.Id);
    
    let vacio =  Guid.createEmpty();

    if (this.model.RespSeleccionada == vacio.toString())
    {
          var url = 'http://localhost:56782/JugarMobile/saveGame';
          // let postData = new FormData();
          // postData.append('usuario', 'test');
          this.model.RespSeleccionada = item.Id;
           let data : FormData = new FormData();
          let obj = { name : "gares" };
          let objStr = JSON.stringify(this.model);
          data.append("Contenido", objStr);
          data.append("usuarioId", this.datos.Id );
          data.append("tokenId", this.datos.token );
          this.jugarService.doSave(data)
          //this.Http.post(url, data)
          .subscribe( res => {
          console.log(res);
          let data = res.json();

            if (data.error!= '' && data.error !=null && data.error != undefined)
            {  
                this.navCtrl.setRoot(LoginPage, {
                  error: data.error } );
            }
            else
            {
                this.RespuestaCorrecta=data.Id;

                let TIME_IN_MS = 2000;
                let hideFooterTimeout = setTimeout( () => {
                this.model.RespSeleccionada='';
                this.get();
            
                    }, TIME_IN_MS);
            }
     
          });
     

      //  if (data.Error!='' )
      //  {
      //     this.errors = data.Error;
      //  }
      //  else
      //  {
      //    this.errors =[];
      //    this.datos = data.Result;
      //    window.localStorage.users_data = JSON.stringify(data.Result);
      //    this.navCtrl.setRoot(WelcomePage);
       //}
    
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JugarPage');
  }

}
