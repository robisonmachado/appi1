import { TokenProvider } from './../../providers/token/token';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Slides } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { ResultadoPesquisaPage } from '../resultado-pesquisa/resultado-pesquisa';

@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  public loading: Loading;
  public loadingAtivo: boolean = false;

  public cidades: any[] = [];
  public especialidades: any[] = [
    {id: 1, nome: "Cardiologista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 2, nome: "Neurologista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 3, nome: "Pneumologista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 4, nome: "Clínico Geral", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 5, nome: "Oftalmologista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 6, nome: "Obstetra", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 7, nome: "Ginecologista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 8, nome: "Ortopedista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 9, nome: "Otorrinolaringologista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 10, nome: "Nutricionista", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"},
    {id: 11, nome: "Fisioterapeuta", created_at: "2017-12-16 00:11:28", updated_at: "2017-12-16 00:11:28"}
  ];


  selectOptions = {
    title: 'LISTA DE CIDADES',
    subTitle: 'Toque na cidade para escolher',
    mode: 'md'
  };

  public cidadesObservable: Observable<any[]>;

  public cidadeEscolhida: string;

  @ViewChild('slidesGroup') slidesGroup: Slides;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private tokenProvider: TokenProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
  
    }

    ionSelected() {
      console.log("slides page foi selecionada");
      
    }
    tabClick(event){
      console.log('clique na tab');
    }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: `
      <div text-center>
        <div>Seja Bem-Vindo!</div>
        <div>Estou buscando os dados das cidades para você!</div>
      </div>
      `
    });

    // INICIA O GRUPO DE SLIDES
    this.slidesGroup.autoplayDisableOnInteraction=false;
  
    console.log('slides --> ',this.slidesGroup);
    
    
    this.loading.present().then( (retorno) => {
      console.log('loading present');
      console.log(retorno);
      this.loadingAtivo=true;
    });

    // tempo máximo de espera do loading
    Observable.timer(5000).subscribe( (retorno) => {
      if(this.loadingAtivo){
        this.loading.dismiss().then( (retorno) => {
          this.loadingAtivo=false;
        });
      }
    });


    this.cidadesObservable = this.tokenProvider.builder('cidade').list();

    this.cidadesObservable.subscribe( (cidades) => {
      this.cidades = cidades;
      if(this.loadingAtivo){
        this.loading.dismiss().then( (retorno) => {
          this.loadingAtivo=false;
        });
      }
          
    });


    // teste página de resultados
    /* this.navCtrl.push(ResultadoPesquisaPage, { 
      cidades: this.cidades, 
      especialidades: this.especialidades,
      cidadeEscolhida: this.cidadeEscolhida
    
    }); */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidePage');
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
              //this.navCtrl.push(PesquisarPage, { cidades: this.cidades});
              this.navCtrl.push(PesquisarPage, { 
                cidades: this.cidades, 
                especialidades: this.especialidades,
                cidadeEscolhida: this.cidadeEscolhida
              
              });
            
          }
        });

      }
      
    
      alert.present();

  }

}
