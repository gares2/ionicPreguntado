import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Entorno } from "../models/urlconfig";
import { Observable } from "rxjs/Observable";
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable()
export class JugarService
{
    private headers = new Headers();

    constructor( private entorno : Entorno, public httpClient:HttpClient, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

    play(model : any,objStr:any) : Observable<Response>
    {
        //this.Http.get('http://localhost:56782/JugarMobile/play/?usuarioId=' + this.datos.Id +"&tokenId=" + this.datos.token +"&Contenido=" + objStr    );
        let url = this.entorno.url + '/JugarMobile/play/?usuarioId=' + model.Id +"&tokenId=" + model.token +"&Contenido=" + objStr    
        //this.categorias = this.Http.get('http://localhost:56782/JugarMobile/IndexMobile/?usuarioId='+this.datos.Id +"&tokenId=" + this.datos.token );
        return this.http.get(url);
    }

    doSave(model : FormData) : Observable<Response>
    {
        let url = this.entorno.url + 'JugarMobile/saveGame';
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