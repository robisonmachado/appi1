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

  ultimaInformacaoExibibida: {exibirInformacoes: string}[]=[];

  //exibirInformacoes: string = 'abrir';
  estado: boolean = false;
  public profissionais = [
    { 
      nome: 'Dr. João da Silva',
      foto: 'https://www.companhiadasletras.com.br/images/autores/01016_gg.jpg',
      bairro: 'Cidade Nova',
      endereco: 'Rua dos Papagaios Amarelos, nº 120',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'joaodasilva@provedordeemail.com',
      exibirInformacoes: 'fechar', 
      planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']
    },
    
    { 
      nome: 'Dr. Manoel Bastos',
      foto: 'http://4.bp.blogspot.com/-E1IkQz2PR8E/VS0PQ5TxQhI/AAAAAAAAAUM/N7cPlv1Ghs8/s1600/Doutor%2BMédico%2BPatrício%2BTeixeira%2BLeite.jpg',
      bairro: 'Belo Horizonte II',
      endereco: 'Rua das Andorinhas Azuis, nº 11421',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'manoelbastos@provedordeemail.com', 
      exibirInformacoes: 'fechar', 
      planos: ['SAAE', 'UNIMED', 'LUZ ETERNA', 'SAMP']
    },

    { 
      nome: 'Drª Carolina Ferreira',
      foto: 'http://e.glbimg.com/og/ed/f/original/2011/08/04/eliane_brum.jpg',
      bairro: 'Aeroporto',
      endereco: 'Rua Projeta A, quadra C, nº 3',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'ferreiracarolina@provedordeemail.com',
      exibirInformacoes: 'fechar', 
      planos: ['UNIMED']
    },

    { 
      nome: 'Drª Mariana Florentiana',
      foto: 'http://marcelolopes.jor.br/upload/noticias/20160321224601_205.jpg',
      bairro: 'Pedra Azul',
      endereco: 'Rua Florisbela, nº 65',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'drmarianaflor@provedordeemail.com',
      exibirInformacoes: 'fechar', 
      planos: ['UNIMED', 'SAMP']
    },

    { 
      nome: 'Dr. Roberto Quintiliano',
      foto: 'https://midias.gazetaonline.com.br/_midias/jpg/2017/08/02/doutor_ze_carlos-5222929.jpg',
      bairro: 'Ponte Nova',
      endereco: 'Av. Rio de Janeiro, nº 762',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'quintilianorobert@provedordeemail.com',
      exibirInformacoes: 'fechar', 
      planos: ['UNIMED']
    },

    { 
      nome: 'Drª Ana Paula Muniz', 
      foto: 'http://3.bp.blogspot.com/-nmORN42u9UM/VcEEX2YPN3I/AAAAAAAAkVo/o5m-kKvU9Fw/s1600/ORESUMODAMODA%2B-%2BBELEZA%2B-%2BM%25C3%25A9dica%2Bdermatologista%2Btraz%2Bpara%2Bo%2BBrasil%2Bnovidade%2Bpara%2Ba%2Bredu%25C3%25A7%25C3%25A3o%2Bde%2Bgordura.tiff',
      bairro: 'Paraíso',
      endereco: 'Av. Primavera do Sul, nº 1120',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'anamuniz@provedordeemail.com', 
      exibirInformacoes: 'fechar', 
      planos: ['SAAE', 'UNIMED']
    },

  ];


  abrirFecharInformacoes(profissional: {nome:string, detalhes: string, exibirInformacoes: string}){
    
    let exibirInformacoes:string = profissional.exibirInformacoes;
    console.log('exibir informações antes => ', exibirInformacoes);    
    
    exibirInformacoes = (exibirInformacoes === 'abrir' ? 'fechar' : 'abrir'); 
    
    console.log('exibir informações depois => ', exibirInformacoes);

    this.ultimaInformacaoExibibida.forEach(prof => {
      console.log('foreach => ', prof)
      prof.exibirInformacoes='fechar';
      this.ultimaInformacaoExibibida.pop();
    });
    
    profissional.exibirInformacoes = exibirInformacoes;

    console.log('abrirFecharInformacoes -> profissional ==> ', profissional, ' <> exibirInformacoes = ', profissional.exibirInformacoes);
    
    this.ultimaInformacaoExibibida.push(profissional);
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
