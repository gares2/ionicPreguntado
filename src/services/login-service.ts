import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Entorno } from "../models/urlconfig";
import { Observable } from "rxjs/Observable";
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable()
export class LoginService
{
    private headers = new Headers();

    constructor( private entorno : Entorno, public httpClient:HttpClient, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

    doLogin(model : any) : Observable<Response>
    {
        let url = this.entorno.url + 'Account/LoginMobile';
         let options = this.generateOptions();
        //return this.http.post(url, model, options);
        // let httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type':  'application/x-www-form-urlencoded',
        //       'Accept':'application/json'
        //     })};
        var headers = new Headers();
        headers.append("Accept", '/');
        headers.append('Content-Type', 'application/json' );
        // headers.append('Access-Control-Allow-Credentials', 'true' );
        // headers.append('Upgrade-Insecure-Requests', 'true' );
        
        
        // headers.append('withCredentials','true');
        // headers.append('Access-Control-Allow-Origin','*');
      
        // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization,Upgrade-Insecure-Requests');

        const requestOptions = new RequestOptions({ headers: headers });
    
        return this.http.post(url,model , requestOptions );
    }

    doRegister(model : any) : Observable<Response>
    {
        let url = this.entorno.url + 'Account/RegisterMobile';
         let options = this.generateOptions();
        //return this.http.post(url, model, options);
        // let httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type':  'application/x-www-form-urlencoded',
        //       'Accept':'application/json'
        //     })};
        var headers = new Headers();
        headers.append("Accept", '/');
        headers.append('Content-Type', 'application/json' );
        // headers.append('Access-Control-Allow-Credentials', 'true' );
        // headers.append('Upgrade-Insecure-Requests', 'true' );
        
        
        // headers.append('withCredentials','true');
        // headers.append('Access-Control-Allow-Origin','*');
      
        // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization,Upgrade-Insecure-Requests');

        const requestOptions = new RequestOptions({ headers: headers });
    
        return this.http.post(url,model , requestOptions );
    }


    generateOptions() : RequestOptionsArgs
    {
        let options = new RequestOptions({ headers: this.headers });
        return options;
    }
}