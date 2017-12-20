import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisarPage } from './pesquisar';

import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    PesquisarPage,
  ],
  imports: [
    MaterializeModule,
    IonicPageModule.forChild(PesquisarPage),
  ],
})
export class PesquisarPageModule {}
