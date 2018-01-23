
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

  loading: Loading;
  loadingAtivo = false;

  slides: Slide[];

  slidesOptions = {
    initialSlide: 0,
    loop: true,
    autoplay: 2000,
    effect: 'slide',
    paginationType: 'bullets',
    autoplayDisableOnInteraction: false,
    speed: 1000,
    pager: true
   
  }

  cidades: Cidade[];
  especialidades: Especialidade[];

  selectOptions = {
    title: 'LISTA DE CIDADES',
    subTitle: 'Toque na cidade para escolher',
    mode: 'md'
  };

  
  cidadeEscolhidaNome: string;
  cidadeEscolhidaId: number;

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
      if(this.apiAccessProvider.slidesObtidos){
        this.slides = this.apiAccessProvider.slides
      }else{
        this.apiAccessProvider.slidesObtidosEvent.subscribe(
          (evento: {slidesObtidos: Slide[]}) => {
            this.slides = evento.slidesObtidos
            
            //this.slidesGroup.autoplayDisableOnInteraction=false;
          }
        )
      }
    }


  desativarLoading(){
    if(this.cidades !== undefined && this.especialidades !== undefined){
      this.loading.dismiss().then( (retorno) => {
        console.log('SlidePage.desativarLoading => desabilitando loading...')
        this.loadingAtivo=false;
      })
    }
    
  }

  getCidades(){
    if(this.apiAccessProvider.cidadesObtidas){
      this.cidades = this.apiAccessProvider.cidades
    }else{
      this.apiAccessProvider.cidadesObtidasEvent.subscribe(
        (evento: {cidadesObtidas: Cidade[]}) => {
          this.cidades=evento.cidadesObtidas
          this.desativarLoading()
        }
      )
    }
  }

  getEspecialidades(){
    if(this.apiAccessProvider.especialidadesObtidas){
      this.especialidades = this.apiAccessProvider.especialidades
    }else{
      this.apiAccessProvider.especialidadesObtidasEvent.subscribe(
        (evento: {especialidadesObtidas: Especialidade[]}) => {
          this.especialidades = evento.especialidadesObtidas
          this.desativarLoading()
        }
      )
    }
  }


  ngOnInit() {

    console.log('ngOnInit ==> cidades: ', this.cidades, ' <> especialidades: ', this.especialidades)

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
          this.getSlides()
          this.getCidades()
          this.getEspecialidades()
          
        }
      )

      return
    }else{
      this.getSlides()
      this.getCidades()
      this.getEspecialidades()
    }
    
 
  }


  mostrarListaEscolherCidade() {
    let alert = this.alertCtrl.create();
    alert.addButton({text: 'Cancelar'});
    alert.setTitle('Escolha a cidade');
    for (let cidade of this.cidades) {
      alert.addInput({
        type: 'radio',
        label: cidade.nome,
        value: `${cidade.id}`
      });
    }

    alert.addButton({
      text: 'Ok',
      handler: (cidadeId: any) => {
        console.log('Checkbox data:', cidadeId);
        this.navCtrl.push(PesquisarPage, { 
        cidades: this.cidades, 
        especialidades: this.especialidades,
        cidadeEscolhidaId: cidadeId
      });
            
    }
  });


  alert.present();

  }

}



