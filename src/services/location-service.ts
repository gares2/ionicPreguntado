import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Entorno } from "../models/urlconfig";
import { Observable } from "rxjs/Observable";
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable()
export class LocationService
{
    private headers = new Headers();

    constructor( private entorno : Entorno, public httpClient:HttpClient, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

  

    doSave(model : FormData) : Observable<Response>
    {
        let url = this.entorno.url + 'Localizacion/save';
        let options = this.generateOptions();
       
        var headers = new Headers();
        headers.append("Accept", '/');
        headers.append('Content-Type', 'application/x-www-form-urlencoded' );
        const requestOptions = new RequestOptions({ headers: headers });
    
        return this.http.post(url,model  );
    }

    generateOptions() : RequestOptionsArgs
    {
        let options = new RequestOptions({ headers: this.headers });
        return options;
    }
}