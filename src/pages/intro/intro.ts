import { ApiAccessProvider } from './../../providers/api-access/api-access';
import { SlidePage } from './../slide/slide';
import { ContatoPage } from './../contato/contato';
import { PesquisarPage } from './../pesquisar/pesquisar';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';
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

    introPageIniciada = false

    @ViewChild("introTabs") introTabs: Tabs;
    
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private apiAccessProvider: ApiAccessProvider
    ) {
      
    }

 
  


    slidePageSelected(event: Tab){
      console.log('slidePageSelected ---> introPage iniciada ==> ', this.introPageIniciada)

      if(this.introPageIniciada){
        console.log('rootPage ==> ', event.root)
        event.goToRoot({});
        console.log('rootPage ==> ', event.root)
      }

    }

    change(event: Tab){
      if(event.root.name == 'SlidePage'){
        console.log('IntroPage change ==> ', event.root.name)
        this.slidePageSelected(event)
      }
      
    }

    ngAfterViewChecked() {
        
    }

    ngOnInit() {
      this.apiAccessProvider.slidesObtidosEvent.subscribe(
        response => {
          this.introPageIniciada = true 
          console.log('IntroPage ---> slides obtidos via apiAccessProvider')        
        }
      )
      
    }

}
