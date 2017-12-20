import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TokenProvider {

  private url: string;
  
  private apiUserId = 2;
  private apiClientSecret = '5F6Nmq4MtCplSHJ9Bs9TYomvVVtsmMmJqHXmZBMA'; 
  private apiUserName = 'apigr@provedor.com';
  private apiPassword = '!@#$%apigr!@#$%';

  private accessTokenOauthUrl: string = 'http://laravel55.unicorpconsultoria.com/oauth/token';
  public accessToken: Observable<string>; // variable to store the access token
  private headers = new Headers(); // headers for each request
  private options = new RequestOptions({ headers: this.headers });

  private postDataRequireToken = {
      grant_type: "password",
      client_id: this.apiUserId,
      client_secret: this.apiClientSecret,
      username: this.apiUserName,
      password: this.apiPassword
    }

public cidades: Observable< any[] >;

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }


  ngOnInit() {
    
    this.cidades = this.builder('cidade').list();
  }

    public setAccessToken(): Observable<string>{
    
    this.accessToken = this.getAccesstoken();
    
    console.log('setAccessToken >>> this.accessToken => '+this.accessToken);
    console.log(this.headers.toJSON());

    return this.accessToken;
}

    public getAccesstoken(): Observable<string>{
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    
    return this.http.post(this.accessTokenOauthUrl, this.postDataRequireToken, this.options)
    .map( (response) => {

        if(response.ok){
            return response.json().access_token;
        }else{
            return false;
        }
        
    });

    

}

builder(resource: string){
    this.url = 'http://laravel55.unicorpconsultoria.com/api/' + resource;
    return this;
}

list(): Observable< any[] >{

    return this.setAccessToken()
      .do( () => {} )
      .flatMap(
      (accessToken) => {
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Authorization', 'Bearer '+accessToken);

        console.log('list => headers');
        console.log(this.headers);
        console.log('list => accessToken');
        console.log(accessToken);

        return this.http.get(this.url, { headers: this.headers }).map(
          (res : any ) => {
            return res.json().data || {};
        });

      });
    
      

}


}
