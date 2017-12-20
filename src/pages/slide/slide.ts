
import { TokenProvider } from './../../providers/token/token';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  selectOptions = {
    title: 'LISTA DE CIDADES',
    subTitle: 'Toque na cidade para escolher',
    mode: 'md'
  };

  public cidades: Observable<any[]>;

  public cidadeEscolhida: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private tokenProvider: TokenProvider) {
  }

  ngOnInit() {
    
    this.cidades = this.tokenProvider.builder('cidade').list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidePage');
  }

}
