
import { TokenProvider } from './../../providers/token/token';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  public loading: Loading;
  
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
    private tokenProvider: TokenProvider,
    public loadingCtrl: LoadingController
    ) {
  
      this.loading = this.loadingCtrl.create({
        content: 'Buscando dados dos profissionais...'
      });

    }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: `
      <div text-center>
        <div>Seja Bem-Vindo!</div>
        <div>Estou buscando os dados dos profissionais para você!</div>
      </div>
      `
    });

    this.loading.present();

    this.cidades = this.tokenProvider.builder('cidade').list();

    this.cidades.subscribe( resposta => this.loading.dismiss());

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidePage');
  }

}
