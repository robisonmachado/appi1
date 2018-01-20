import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { trigger,state,style,query,transition,animate,keyframes, animateChild } from '@angular/animations';
import { Profissional, ApiAccessProvider } from '../../providers/api-access/api-access.module';

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

      transition('fechar => abrir', animate('300ms ease-in')),
      transition('abrir => fechar', animate('300ms ease-out')),
      


    ]),

  ]

})
   


export class ResultadoPesquisaPage {

  cidadeEscolhidaId: number
  cidadeEscolhidaNome: string
  especialidadeEscolhidaId: number
  especialidadeEscolhidaNome: string

  loading: Loading
  ultimaInformacaoExibibida: {exibirInformacoes: string}[]=[];

  //exibirInformacoes: string = 'abrir';
  estado = false
  profissionais: Profissional[]
/*     { 
      nome: 'Dr. João da Silva',
      foto: 'https://www.companhiadasletras.com.br/images/autores/01016_gg.jpg',
      bairro: 'Cidade Nova',
      endereco: 'Rua dos Papagaios Amarelos, nº 120',
      telefone: '(28) 3532-7070',
      celular: '(28) 99970-7070',
      email: 'joaodasilva@provedordeemail.com',
      exibirInformacoes: 'fechar', 
      planos: ['SAAE', 'UNIMED', 'LUZ ETERNA']
    } */

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public actionSheetCtrl: ActionSheetController,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private apiAccessProvider: ApiAccessProvider
    ) {
      
      console.log('resultadoPesquisaPage => parâmetros encontrados ---> ', this.navParams.data)
      this.cidadeEscolhidaId=this.navParams.get('cidadeEscolhidaId')
      this.cidadeEscolhidaNome=this.navParams.get('cidadeEscolhidaNome')
      this.especialidadeEscolhidaId=this.navParams.get('especialidadeEscolhidaId')
      this.especialidadeEscolhidaNome=this.navParams.get('especialidadeEscolhidaNome')

      this.loading = this.loadingCtrl.create({
        content: 'ES Saúde está buscando os especialistas para você...'
      })
  
      this.loading.present()

      this.apiAccessProvider.obterEspecialistasPorCidade(this.cidadeEscolhidaId, this.especialidadeEscolhidaId)
        .subscribe(
          profissionais => {
            this.profissionais=profissionais
            this.loading.dismiss()
          }
        )

    }


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

  // corrigir para funcionar de acordo com a api
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

  ngOnInit() {
   

    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPesquisaPage');
  }

}
