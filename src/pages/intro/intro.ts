import { SlidePage } from './../slide/slide';
import { ContatoPage } from './../contato/contato';
import { PesquisarPage } from './../pesquisar/pesquisar';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
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
    tab3Root = ContatoPage;

    @ViewChild(Nav) nav: Nav;
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      //this.navCtrl.setRoot(ContatoPage);
    }

    irParaTabsPage(){
      this.navCtrl.push(TabsPage);
    }

    tabSelect(event){
      console.log('selecionou a tab');
    }

}
