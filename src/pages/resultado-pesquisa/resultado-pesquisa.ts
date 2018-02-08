import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { trigger,state,style,query,transition,animate,keyframes, animateChild, stagger } from '@angular/animations';
import { Profissional, Plano, ApiAccessProvider } from '../../providers/api-access/api-access.module';



class ProfissionalUI extends Profissional{
  exibirInformacoes='fechar'
}

@IonicPage()
@Component({
  selector: 'page-resultado-pesquisa',
  templateUrl: 'resultado-pesquisa.html',

  animations: [

    trigger('animacao', [

      state('fechar', style({
          opacity:0,
          //transform: 'translateX(-100%)',
          display: 'none'        
      })),

      state('abrir', style({
        opacity:1,
        
      })),

     

      //transition('fechar => abrir', animate('300ms ease-in')),
      
      transition('fechar => abrir', animate('0.5s 300ms',keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 0.7, transform: 'translateX(10%)',  offset: 0.8}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        
        ])
      )),

      //transition('abrir => fechar', animate('300ms ease-out')),
      transition('abrir => fechar', animate('0.4s', keyframes([
        style({opacity: 1, transform: 'translateX(0)', offset: 0}),
        style({opacity: 0.7, transform: 'translateX(-20%)',offset: 0.3}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1})
        
        
        ])
      )),
      
      


    ]),

  ]

})
   


export class ResultadoPesquisaPage {

  cidadeEscolhidaId: number
  cidadeEscolhidaNome: string
  especialidadeEscolhidaId: number
  especialidadeEscolhidaNome: string

  loading: Loading
  loadingDidDismiss: boolean = false
  
  ultimaInformacaoExibibida: {exibirInformacoes: string}[]=[];

  estado = false
  profissionais: ProfissionalUI[] = []


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
      this.loading.onDidDismiss(
        retorno => {
            console.log('loading dismiss() ---> ',retorno)
            this.loadingDidDismiss=true
        }
      )

      this.apiAccessProvider.obterEspecialistasPorCidade(this.cidadeEscolhidaId, this.especialidadeEscolhidaId)
        .subscribe(
          profissionais => {
            profissionais.forEach(
              profissional => {
                let profUI: ProfissionalUI

                profUI=profissional as ProfissionalUI 
                profUI.exibirInformacoes='fechar'              
                this.profissionais.push(profUI)
              }
            )
            this.loading.dismiss()
          }
        )

    }


  abrirFecharInformacoes(profissional: ProfissionalUI){
    
    let exibirInformacoes:string = profissional.exibirInformacoes;
    console.log('abrirFecharInformacoes => valor antes => ', exibirInformacoes);    
    
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
  mostrarPlanos(profissional: {nome: string, planos: Plano[]}){
    let buttons: any[] = [];
    let alert = this.alertCtrl.create({title: 'Planos', cssClass: 'alerta'});
  
  
    if(profissional.planos.length==0){
      alert.addInput(
        {
          type: 'checkbox',
          label: 'sem planos',
          checked: true,
        }
      );
    }

    profissional.planos.forEach(plano => {
      alert.addInput(
        {
          type: 'checkbox',
          label: plano.nome,
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



}
