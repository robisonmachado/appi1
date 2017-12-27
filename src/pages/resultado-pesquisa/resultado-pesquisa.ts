import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger,state,style,query,transition,animate,keyframes, animateChild } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-resultado-pesquisa',
  templateUrl: 'resultado-pesquisa.html',

  animations: [

    trigger('animacao', [

      state('fechar', style({
          opacity:0,
          transform: 'translateY(-100%)',
          display: 'none'        
      })),

      state('abrir', style({
        opacity:1,
        
      })),

      transition('* => *', animate('300ms ease-in')),


    ]),

   

  ]

})
   


export class ResultadoPesquisaPage {

  exibirInformacoes: string = 'abrir';
  estado: boolean = false;

  abrirFecharInformacoes(profissional: {nome:string, detalhes: string, exibirInformacoes: string}){
    this.exibirInformacoes = (this.exibirInformacoes == 'fechar' ? 'abrir' : 'fechar');
    
    if( profissional.exibirInformacoes === undefined){
      profissional.exibirInformacoes = 'fechar';
      console.log('abrirFecharInformacoes -> profissional ==>  definindo exibirInformacoes = ', profissional.exibirInformacoes);
      return;
    }else{
      profissional.exibirInformacoes = (profissional.exibirInformacoes === 'abrir' ? 'fechar' : 'abrir');
    }
    
    console.log('abrirFecharInformacoes -> profissional ==> ', profissional, ' <> exibirInformacoes = ', profissional.exibirInformacoes);
    //console.log();
  }

  public profissionais = [
    { nome: 'Dr. João da Silva', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar'},
    { nome: 'Dr. Manoel Bastos', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar'},
    { nome: 'Drª Carolina Ferreira', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar'},
    { nome: 'Drª Mariana Florentiana', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar'},
    { nome: 'Dr. Roberto Quintiliano', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar'},
    { nome: 'Drª Ana Paula Muniz', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPesquisaPage');
  }

}
