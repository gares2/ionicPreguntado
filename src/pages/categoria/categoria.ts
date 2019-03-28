import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JugarPage } from '../jugar/jugar';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LoginPage } from '../Login/login';
import { CategoService } from '../../services/catego-service';
/**
 * Generated class for the CategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
  providers:[CategoService]
})
export class CategoriaPage {
  categorias: Observable<any>;
  model: any [];
  datos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public Http: Http, private categoservice:CategoService) {

    // let data : FormData = new FormData();
    // let obj = { name : "gares" };
    // let objStr = JSON.stringify(this.log);
    // data.append("Contenido", objStr)
    // data.append("")
    

    
  }

  ionViewWillEnter()
  {

          let dataStr =  window.localStorage.users_data
          //let dataStr = localStorage.getItem("users_data");
          if (dataStr!=undefined)
        this.datos = JSON.parse(dataStr);
          this.categoservice.GetCategoria(this.datos)
        .subscribe(res => {
          console.log(res);
          let data = res.json();
            
          if (data.Error!= '' && data.Error !=null )
          {  
              this.navCtrl.setRoot(LoginPage, {
                error: data.Error } );
          }
          else
          {
              console.log('my data: ', data);
              // console.log('my data: ', data.Result[0].Id);
              this.model = data.Result;
          }
          
          // console.log( data.Result);
            
        })

  }

  play(item)
  {
    this.navCtrl.push(JugarPage, {
      firstPassed: item.Id,
      secondPassed: "value 2"
    })
    
   alert (item.Nombre);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

}
