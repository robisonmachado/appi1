import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Cidade, CidadeApiData } from './models/cidade.model'
import { Especialidade } from './models/especialidade.model'
import { Profissional } from './models/profissional.model'
import { Plano, PivoPlanoProfissional } from './models/plano.model'
import { Token } from './models/token.model'
import { Slide } from './models/slide.model'
import { ApiAccessProvider } from './api-access';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports:[],
  providers: [ApiAccessProvider]
})


export class ApiAccessModule {


 }

 export {Cidade, CidadeApiData, Especialidade, Profissional, Plano, PivoPlanoProfissional,Token, Slide, ApiAccessProvider}


