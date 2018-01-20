import { ResultadoPesquisaPage } from './../resultado-pesquisa/resultado-pesquisa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
//import { ApiAccessProvider } from '../../providers/api-access/api-access';
import { Cidade, Especialidade, ApiAccessProvider } from '../../providers/api-access/api-access.module';



class Dado{
  title: string
  details: string
  icon: string
  showDetails: boolean
}

class EspecialidadeEscolhida{
  id: number
  nome: string
}

class CidadeEscolhida{
  id: number
  nome: string
}

@IonicPage()
@Component({
  selector: 'page-pesquisar',
  templateUrl: 'pesquisar.html',
})
export class PesquisarPage {

 
  cidades: Cidade[];
  cidadeEscolhidaNome: string;
  cidadeEscolhidaId: number;

  especialidades: Especialidade[];
  especialidadeEscolhidaNome : string;
  especialidadeEscolhidaId: number
  
  public loading: Loading;

  selectOptions = {
    title: 'LISTA DE CIDADES',
    subTitle: 'Toque na cidade para escolher',
    mode: 'md'
  };


  data: Dado[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private apiAccessProvider: ApiAccessProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    if(navParams.get('cidades')){
      this.cidades=navParams.get('cidades')
    }else{
      console.log('cidades da api --> ', this.apiAccessProvider.cidades)
      this.apiAccessProvider.cidadesObtidasEvent.subscribe(
        (evento: {cidadesObtidas: Cidade[]}) => {
          this.cidades=evento.cidadesObtidas
          console.log('PesquisarPage => evento cidadesObtidas ---> ', this.cidades)
        }
      )
    }

    if(navParams.get('especialidades')){
      this.especialidades=navParams.get('especialidades')
    }else{
      this.apiAccessProvider.especialidadesObtidasEvent.subscribe(
        (evento: {especialidadesObtidas: Especialidade[]}) => {
          this.especialidades=evento.especialidadesObtidas
          console.log('PesquisarPage => evento especialidadesObtidas ---> ', this.especialidades)
        }
      )
    }
    
    if(navParams.get('cidadeEscolhidaId')){
      let cidadeEscolhidaId=navParams.get('cidadeEscolhidaId')
      console.log('pesquisarPage --> recebeu parâmetro cidadeEscolhidaId ---> ',cidadeEscolhidaId)
      this.cidadeEscolhidaId=cidadeEscolhidaId
      this.cidadeEscolhidaNome=this.apiAccessProvider.obterCidadePeloId(this.cidadeEscolhidaId).nome
    }

    this.loading = this.loadingCtrl.create({
      content: 'Buscando cidades e especialidades...'
    });

  }


  toggleDetails(data, event) {
    console.log(data);
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
 
  }


  fazerPesquisa(){
    console.log('fazerPesquisa');
    if(this.cidadeEscolhidaId && this.especialidadeEscolhidaId){
      console.log('pesquisando profissionais ===> cidadeId: ' 
                    + this.cidadeEscolhidaId 
                    + ' - especialidadeId: '
                    +this.especialidadeEscolhidaId
                  );
      
      this.navCtrl.push(ResultadoPesquisaPage, {
        cidadeEscolhidaId: this.cidadeEscolhidaId,
        cidadeEscolhidaNome: this.cidadeEscolhidaNome,
        especialidadeEscolhidaId: this.especialidadeEscolhidaId,
        especialidadeEscolhidaNome: this.especialidadeEscolhidaNome
      });

      this.especialidadeEscolhidaNome=undefined
      this.especialidadeEscolhidaId=undefined

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
        this.cidadeEscolhidaId = cidadeId;
        console.log('mostrarListaEscolherCidade => Checkbox data:', cidadeId)
        let cidade = this.apiAccessProvider.obterCidadePeloId(cidadeId)

        if(cidade){
          console.log('mostrarListaEscolherCidade => obterCidadePeloId('+cidadeId+') --> ', cidade )
          this.cidadeEscolhidaNome = cidade.nome
        }
        
        this.fazerPesquisa();
        }
    });
  
    alert.present();
  }



  mostrarListaEscolherEspecialidade() {
    let alert = this.alertCtrl.create();

    alert.addButton({text: 'Cancelar'});
    alert.setTitle('Escolha a especialidade');

    for (let especialidade of this.especialidades) {
      alert.addInput({
        type: 'radio',
        label: especialidade.nome,
        value: `${especialidade.id}`
      });
    }

    alert.addButton({
      text: 'Ok',
      handler: (especialidadeId: any) => {
        this.especialidadeEscolhidaId = especialidadeId
        console.log('mostrarListaEscolherEspecialidade => Checkbox data:', especialidadeId);
        let especialidade = this.apiAccessProvider.obterEspecialidadePeloId(especialidadeId)
        
        if(especialidade){
          console.log('mostrarListaEscolherEspecialidade => obterEspecialidadePeloId('+especialidadeId+') --> ', especialidade )
          this.especialidadeEscolhidaNome = especialidade.nome
        }

        this.fazerPesquisa();            
      }
    });

    alert.present();
  }










}

