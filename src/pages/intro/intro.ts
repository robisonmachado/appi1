import { SlidePage } from './../slide/slide';
import { ContatoPage } from './../contato/contato';
import { PesquisarPage } from './../pesquisar/pesquisar';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {Tabs} from "ionic-angular"


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  
    tab1Root = SlidePage;
    tab2Root = PesquisarPage;
    tab3Root = ContatoPage;

    @ViewChild("introTabs") introTabs: Tabs;
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      
    }

    irParaTabsPage(){
      this.navCtrl.push(TabsPage);
    }

  
    ngAfterViewInit() {
      //this.introTabs.select(1)      
    }

    ngOnInit() {
      
      
    }

}
