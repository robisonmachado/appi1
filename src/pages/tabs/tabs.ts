import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Nav, NavController } from 'ionic-angular';
import { ContatoPage } from '../contato/contato';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  @ViewChild(Nav) nav: Nav;
  
  constructor(public navCtrl: NavController) {
    
  }

  ngOnInit() {
        
  }
}
