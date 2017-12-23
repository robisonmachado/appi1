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
          opacity:0
        
      })),

      state('abrir', style({
        opacity:1
      })),

      transition('* => *', animate('4000ms ease-in')),


    ]),

    trigger('animacao2', [

      state('fechar', style({
          opacity:0
        
      })),

      state('abrir', style({
        opacity:1
      })),

      transition('* => *', 
        //[style({ opacity: 0 }),  animateChild(), animate('1000ms ease-in')]
        query('div', [style({ opacity: 0 }),  animateChild(), animate('1000ms ease-in')])
    
      ),

    

    ]),


  
     

  ]

})
   




export class ResultadoPesquisaPage {

  exibirInformacoes: string = 'abrir';
  estado: boolean = false;

  abrirFecharInformacoes(){
    this.exibirInformacoes = (this.exibirInformacoes == 'fechar' ? 'abrir' : 'fechar');
    console.log('abrirFecharInformacoes ==> '+this.exibirInformacoes);
    //console.log();
  }

  public profissionais = [
    { nome: 'Dr. João da Silva', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh '},
    { nome: 'Dr. Manoel Bastos', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh '},
    { nome: 'Drª Carolina Ferreira', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh '},
    { nome: 'Drª Mariana Florentiana', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh '},
    { nome: 'Dr. Roberto Quintiliano', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh '},
    { nome: 'Drª Ana Paula Muniz', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh '},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPesquisaPage');
  }

}
