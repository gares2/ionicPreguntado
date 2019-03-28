import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Entorno } from "../models/urlconfig";
import { Observable } from "rxjs/Observable";
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable()
export class ScoreService
{
    private headers = new Headers();

    constructor( private entorno : Entorno, public httpClient:HttpClient, public http:Http)
    {
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }


    GetScore(model : any, objStr:any) : Observable<Response>
    {
        //this.preguntas = this.Http.get('http://localhost:56782/JugarMobile/Result/?usuarioId=' + this.datos.Id +"&tokenId=" + this.datos.token +"&Contenido=" + objStr   );

        let url = this.entorno.url + 'JugarMobile/Result/?usuarioId=' + model.Id +"&tokenId=" + model.token +"&Contenido=" + objStr  
        //this.categorias = this.Http.get('http://localhost:56782/JugarMobile/IndexMobile/?usuarioId='+this.datos.Id +"&tokenId=" + this.datos.token );
        return this.http.get(url);
    }

   

    generateOptions() : RequestOptionsArgs
    {
        let options = new RequestOptions({ headers: this.headers });
        return options;
    }
}