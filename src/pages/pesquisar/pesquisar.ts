import { ResultadoPesquisaPage } from './../resultado-pesquisa/resultado-pesquisa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { TokenProvider } from '../../providers/token/token';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';



@IonicPage()
@Component({
  selector: 'page-pesquisar',
  templateUrl: 'pesquisar.html',
})
export class PesquisarPage {

  public cidadesObservable: Observable<any[]>;
  public cidades: any[] = [];
  public cidadeEscolhida: string;

  public especialidadesObservable: Observable<any[]>;
  public especialidades: any[] = [];
  public especialidadeEscolhida : string;
  
  public loading: Loading;

  selectOptions = {
    title: 'LISTA DE CIDADES',
    subTitle: 'Toque na cidade para escolher',
    mode: 'md'
  };

  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private tokenProvider: TokenProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    let cidadesParam = navParams.get('cidades');
    console.log('params: cidades >>>');
    console.log(cidadesParam);


    let especialidadesParam = navParams.get('especialidades');
    console.log('params: especialidades >>>');
    console.log(especialidadesParam);

    let cidadeEscolhidaParam = navParams.get('cidadeEscolhida');
    console.log('params: cidadeEscolhida >>>');
    console.log(cidadeEscolhidaParam);

    if(cidadesParam){
      console.log('setando cidades -->');
      this.cidades = cidadesParam;
    }
    
    if(especialidadesParam){
      console.log('setando especialidades -->');
      this.especialidades = especialidadesParam;
    }

    if(cidadeEscolhidaParam){
      console.log('setando cidade escolhida -->');
      this.cidadeEscolhida = cidadeEscolhidaParam;
    }

    for(let i = 0; i < 10; i++ ){
      this.data.push({
          title: i%2 == 0 ? 'Dr. João da Silva '+i : 'Drª Mariana Teles Alves '+i ,
          details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          icon: 'ios-add-circle-outline',
          showDetails: false
        });
    }

    this.loading = this.loadingCtrl.create({
      content: 'Buscando cidades e especialidades...'
    });

  }


  toggleDetails(data, event) {
    console.log(data);
    var elemento = event.target;
    console.log(event);

    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }

  ngOnInit() {
    console.log('ngOnInit --> cidades e especialidades');
    console.log(this.cidades);
    console.log(this.especialidades);
    
    this.especialidadesObservable = this.tokenProvider.builder('especialidade').list();
    
    console.log('ngOnInit: this.cidades.length');
    console.log(this.cidades);
    
    this.loading.present();

    if(0 == this.cidades.length && 0 == this.especialidades.length){
      console.log('ngOnInit 1 >>> 0 == this.cidades.length && 0 == this.especialidades.length');

      this.cidadesObservable = this.especialidadesObservable
      .do( especialidades => {
        console.log('especialidades >>>');
        console.log(especialidades);
        this.especialidades=especialidades;
      } )
      .flatMap( (especialidades) => {
        return this.cidadesObservable = this.tokenProvider.builder('cidade').list();
      });
  
      console.log('subscribing on cidades');

      this.cidadesObservable.subscribe( (cidades) => {
        console.log('cidades >>>');
        console.log(cidades);
        this.cidades=cidades;
        this.loading.dismiss();
      } );

    }else if(this.cidades.length > 0 && 0 == this.especialidades.length){
      console.log('ngOnInit 2 >>> this.cidades.length > 0 && 0 == this.especialidades.length');
      
      this.cidadesObservable = this.especialidadesObservable
      .do( especialidades => {
        console.log('especialidades >>>');
        console.log(especialidades);
        this.especialidades=especialidades;
        
      } )
      .flatMap( (especialidades) => {
        console.log('ngOnInit 2 >>> this.loading.dismiss()');
        this.loading.dismiss();
        return this.cidadesObservable = this.tokenProvider.builder('cidade').list();
      });

      this.cidadesObservable.subscribe();
  
    }
    else if(0 == this.cidades.length && this.especialidades.length > 0){
      
      this.cidadesObservable = this.especialidadesObservable
      .do( especialidades => {
        
      } )
      .flatMap( (especialidades) => {
        this.loading.dismiss();
        return this.cidadesObservable = this.tokenProvider.builder('cidade').list();        
      });

      this.cidadesObservable.subscribe();
  
    }
    else if(this.cidades.length > 0 && this.especialidades.length > 0){

      console.log('loading _state');
      console.log(this.loading.isFirst());
      this.loading.dismiss();
      console.log(this.loading.isFirst());

    }

    if(this.cidadeEscolhida && this.especialidadeEscolhida){
      this.fazerPesquisa();
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisarPage');
  }


  fazerListaEscolha(tipoLista: string) {
    let alert = this.alertCtrl.create();

    alert.addButton({text: 'Cancelar'});

    if('cidades' == tipoLista){
    
        alert.setTitle('Escolha a cidade');


        for (let cidade of this.cidades) {
          alert.addInput({
            type: 'radio',
            label: cidade.nome,
            value: cidade.nome
          });

        }

        alert.addButton({
          text: 'Ok',
          handler: (data: any) => {
              console.log('Checkbox data:', data);
              this.cidadeEscolhida = data;
              this.fazerPesquisa();
            
          }
        });

      }
      else if('especialidades' == tipoLista){
        alert.setTitle('Escolha a especialidade');


        for (let especialidade of this.especialidades) {
          alert.addInput({
            type: 'radio',
            label: especialidade.nome,
            value: especialidade.nome
          });

        }

        alert.addButton({
          text: 'Ok',
          handler: (data: any) => {
              console.log('Checkbox data:', data);
              this.especialidadeEscolhida = data;
              this.fazerPesquisa();            
          }
        });

      }
    
      alert.present();

  }

  fazerPesquisa(){
    console.log('fazerPesquisa');
    if(this.cidadeEscolhida && this.especialidadeEscolhida){
      console.log('pesquisando profissionais ===> ');
      console.log('cidade: ' + this.cidadeEscolhida + ' - especialidade: '+this.especialidadeEscolhida);
      this.navCtrl.push(ResultadoPesquisaPage);
    }
  }


}
