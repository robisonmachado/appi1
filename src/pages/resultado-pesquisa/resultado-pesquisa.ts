import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
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
  public profissionais = [
    { nome: 'Dr. João da Silva', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar', planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']},
    { nome: 'Dr. Manoel Bastos', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar', planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']},
    { nome: 'Drª Carolina Ferreira', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar', planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']},
    { nome: 'Drª Mariana Florentiana', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar', planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']},
    { nome: 'Dr. Roberto Quintiliano', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar', planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']},
    { nome: 'Drª Ana Paula Muniz', detalhes: 'hjdfhsdgfhsdf fsdhfgdhgf fdghgjsdfjgh ', exibirInformacoes: 'fechar', planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']},
  ];


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

  mostrarPlanos(profissional: {nome: string, planos: string[]}){
    let buttons: any[] = [];
    let alert = this.alertCtrl.create({title: 'Planos', cssClass: 'alerta'});
  
  

    profissional.planos.forEach(plano => {
      alert.addInput(
        {
          type: 'checkbox',
          label: plano,
          checked: true,
          disabled: true,
        }
      );
    });

    alert.addButton({
      text: 'FECHAR',
      
    });
    alert.present();
    

    


  }

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPesquisaPage');
  }

}
