
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Slides } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { ResultadoPesquisaPage } from '../resultado-pesquisa/resultado-pesquisa';
import { Slide, Cidade, Especialidade } from '../../providers/api-access/api-access.module';
import { ApiAccessProvider } from '../../providers/api-access/api-access';


@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  public loading: Loading;
  public loadingAtivo: boolean = false;

  public slides: Slide[];
  public cidades: Cidade[];
  public especialidades: Especialidade[];

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
    private apiAccessProvider: ApiAccessProvider,
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

    getSlides(){
      this.apiAccessProvider.obterSlides()
        .subscribe(slides => {
          console.log('getSlides => ', slides)
          this.slides = slides
          //this.slidesGroup.autoplayDisableOnInteraction=false
        })
    }


  desativarLoading(){
    this.loading.dismiss().then( (retorno) => {
      console.log('SlidePage.desativarLoading => desabilitando loading...')
      this.loadingAtivo=false;
    });
  }

  getCidades(){
    this.apiAccessProvider.obterCidades()
      .subscribe(cidades => {
        console.log('SlidePage.getCidades => cidades obtidas --> ', cidades);
        this.cidades = cidades;
        this.desativarLoading()
      })
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

    this.loading.present().then( (retorno) => {
      console.log('loading present ---> ', retorno);
      this.loadingAtivo=true;
    });

    if(this.apiAccessProvider.tokenObtido === false){
      console.log('Slide Page --> token não obtido, se inscrevendo no evento tokenObtidoEvent')
      this.apiAccessProvider.tokenObtidoEvent.subscribe(
        tokenObtido => {
          this.getCidades()
          this.getSlides()
        }
      )

      return
    }
    // INICIA O GRUPO DE SLIDES
    this.slidesGroup.autoplayDisableOnInteraction=false;
 /* 
    console.log('slides --> ',this.slidesGroup);
    
    this.getSlides();
    //this.getEspecialidades();
    this.getCidades();

    */

 
   


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
              //this.cidadeEscolhida = data;
              //this.navCtrl.push(PesquisarPage, { cidades: this.cidades});
              this.navCtrl.push(PesquisarPage, { 
                cidades: this.cidades, 
                especialidades: this.especialidades,
                //cidadeEscolhida: this.cidadeEscolhida
                cidadeEscolhida: data
              
              });
            
          }
        });

      }
      
    
      alert.present();

  }

}



