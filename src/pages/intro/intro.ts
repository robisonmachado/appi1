import { SlidePage } from './../slide/slide';
import { ContatoPage } from './../contato/contato';
import { PesquisarPage } from './../pesquisar/pesquisar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  
  tab1Root = SlidePage;
  tab2Root = PesquisarPage;
  //tab2Root = TabsPage;
  tab3Root = ContatoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  irParaTabsPage(){
    this.navCtrl.push(TabsPage);
  }

}
