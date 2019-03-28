import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LocationService } from '../../services/location-service';
import { LoginPage } from '../Login/login';
declare var google:any;

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
  providers: [LocationService]
})
export class MapaPage {

  map: any;
  loading: Loading;
  locations: any =[{latitud:"", longitud:"", fecha:""}];
  loca: any ={latitud:"", longitud:"", fecha:""};
  datos:any =[];
  i:number=1;
  markers: any[] = [
    {
      position:{
        latitude: -17.3666745,
        longitude: -66.2387878,
      }
    },
    {
      position:{
        latitude: -17.3706884,
        longitude: -66.2397749,
      }
     
    },
    {
      position:{
        latitude: -17.391398,
        longitude: -66.2407904,
      }
      
     
    },
    {
      position:{
        latitude: -17.3878887,
        longitude: -66.223664,
      }
     
      
    },
  ];
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private locationService:LocationService
  ) {
  this.locations = [];
  let dataStr =  window.localStorage.users_data
  //let dataStr = localStorage.getItem("users_data");
  if (dataStr!=undefined)
    this.datos = JSON.parse(dataStr);
 
  }
  Show()
  {
    this.loading = this.loadCtrl.create();
    this.loading.present();

    this.geolocation.getCurrentPosition()
    .then(response => {
      //this.loadMap(response);
      //let  myLatLng = {lat: -17.3666745, lng: -66.2387878};
      this.loadMap2(response);
    })
    .catch(error =>{
      console.log(error);
      this.loading.dismiss();
    })

  
  }

  ionViewDidLoad(){
    
    if (localStorage.getItem("users_data")==null)
    {
        this.navCtrl.setRoot(LoginPage, {
        error: "debe loguearse para acceder al mapa" } );
    }

    if (window.localStorage.getItem("Location")!=null)
    this.locations = JSON.parse(window.localStorage.getItem("Location"));
    
  }
  ionViewDidLeave(){
    window.localStorage.setItem("Location", JSON.stringify(this.locations));   
    alert ("salir");
  }
  // addMarker(options){
  //   let markerOptions: MarkerOptions = {
  //     position: new LatLng(options.position.latitude, options.position.longitude),
  //     title: options.title,
  //     icon: options.icon
  //   };
  //   this.map.addMarker;
  // }
  Get()
  {
    this.loading = this.loadCtrl.create();
    this.loading.present();
    this.getPosition();
  }
  Sincro()
  {
     this.locations.forEach(element => {
       alert("longitud " + element.longitud + " latitud: " + element.latitud + element.fecha);
    });
    let data : FormData = new FormData();
    let obj = { name : "gares" };
    let objStr = JSON.stringify(this.locations);
    data.append("Contenido", objStr);
    data.append("usuarioId", this.datos.Id );
    data.append("tokenId", this.datos.token );
    this.locationService.doSave(data).subscribe(
      res => {
        console.log(res);
        let data = res.json();
        alert("Sincronizado")
      });

  }
  getPosition(): void{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
      
    })
    .catch(error =>{
      console.log(error);
      this.loading.dismiss();
    })
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2): any {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

     deg2rad(deg): any {
      return deg * (Math.PI/180)
    }
  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude + this.i;
    console.log(latitude, longitude);
    let fecha2 = new Date().toJSON();
    let loca ={latitud:latitude, longitud:longitude , fecha:fecha2};
    this.loca =loca;
    this.i++;
    
    // this.loca.latitud = latitude;
    // this.loca.longitud = longitude;
    let fecha = new Date();
    
    this.loca.fecha =  fecha.getFullYear() +"-" +  (fecha.getMonth() + 1) + "-" + (fecha.getDay()+ 1) + " " + fecha.getHours() + ":" +  + fecha.getMinutes() + ":" +  fecha.getSeconds();
    alert (this.loca.fecha);
    alert (fecha2);
    

   this.locations.push(this.loca);
    window.localStorage.setItem("Location", JSON.stringify(this.locations));
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    

    let valor = this.getDistanceFromLatLonInKm(latitude,longitude,-34.5406743,-58.4745781); //google.maps.geometry.spherical.computeDistanceBetween(position, new google.maps.LatLng(myLatLng, myLatLng));
    alert(valor);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.loading.dismiss();
      
       
        let marker = new google.maps.Marker({
          position:myLatLng,
          map: this.map,
          title:'Point 3'
        });
        console.log("marker" + marker);
     
      mapEle.classList.add('show-map');
    });
  }


    loadMap2(position: Geoposition){
  
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    this.loca.latitud = latitude;
    this.loca.longitud = longitude;
    let fecha = new Date();
    let fecha2 = new Date().toJSON();
    this.loca.fecha =  fecha.getFullYear() +"-" +  (fecha.getMonth() + 1) + "-" + (fecha.getDay()+ 1) + " " + fecha.getHours() + ":" +  + fecha.getMinutes() + ":" +  fecha.getSeconds();
    alert (this.loca.fecha);
    alert (fecha2);
    this.loca.fecha = fecha2;

   this.locations.push(this.loca);

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    
    let valor = this.getDistanceFromLatLonInKm(latitude,longitude,-34.5406743,-58.4745781); //google.maps.geometry.spherical.computeDistanceBetween(position, new google.maps.LatLng(myLatLng, myLatLng));
    alert(valor);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.loading.dismiss();
      let infoWindow = new google.maps.InfoWindow({
        content: "<h4>Information!</h4>"
      });
      
       this.locations.forEach(element => {
        let myLatLng = {lat: element.latitud, lng: element.longitud};
        let marker = new google.maps.Marker({
          position:myLatLng,
          map: this.map,
          title:'Point 3'
        });
        infoWindow.open(this.map, marker);
        console.log(marker);
        // let myLatLng2 = {lat: -17.391398, lng: -56.2407904};
        // let marker2 = new google.maps.Marker({
        //   position:myLatLng2,
        //   map: this.map,
        //   title:'Point 2'
        // });
        
        
        //infoWindow.open(this.map, marker2);
        // console.log(marker2);
      });
      // latitude: -17.391398,
      // longitude: ,
     
     
      
      mapEle.classList.add('show-map');
    });
  }
}
