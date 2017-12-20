import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TokenProvider } from '../../providers/token/token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  private url: string;
  
      
    public cidades: Observable< any[] >;
   
  constructor(
      public navCtrl: NavController, 
      private http: Http,
      private tokenProvider: TokenProvider
    ) {

  }

ngOnInit() {
    
    this.cidades = this.tokenProvider.builder('cidade').list();
  

}







}
