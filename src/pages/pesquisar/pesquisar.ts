import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TokenProvider } from '../../providers/token/token';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-pesquisar',
  templateUrl: 'pesquisar.html',
})
export class PesquisarPage {

  public cidades: Observable<any[]>;
  public cidadeEscolhida: string;

  selectOptions = {
    title: 'LISTA DE CIDADES',
    subTitle: 'Toque na cidade para escolher',
    mode: 'md'
  };

  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private tokenProvider: TokenProvider) {
    for(let i = 0; i < 10; i++ ){
      this.data.push({
          title: i%2 == 0 ? 'Dr. João da Silva '+i : 'Drª Mariana Teles Alves '+i ,
          details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          icon: 'ios-add-circle-outline',
          showDetails: false
        });
    }
  }

  toggleDetails(data, event) {
    console.log(data);
    var elemento = event.target;
    console.log(event);

    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }

  ngOnInit() {
    this.cidades = this.tokenProvider.builder('cidade').list();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisarPage');
  }

}
