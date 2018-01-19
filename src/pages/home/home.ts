import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiAccessProvider } from '../../providers/api-access/api-access';
import { Cidade } from '../../providers/api-access/models/cidade.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  private url: string;
  
      
    public cidades: Observable< Cidade[] >;
   
  constructor(
      public navCtrl: NavController, 
      private http: Http,
      private apiAccessProvider: ApiAccessProvider
    ) {

  }

ngOnInit() {
    
    this.cidades = this.apiAccessProvider.obterCidades()
  

}







}
