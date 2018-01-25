import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Cidade, CidadeApiData, Especialidade, Profissional, Plano,Token, Slide } from './api-access.module'



const URL_API_TOKEN = 'http://essaude.unicorpconsultoria.com/oauth/token'
const URL_API = 'http://essaude.unicorpconsultoria.com/api'
const CLIENT_ID = 3
const CLIENT_SECRET = 'rwN7lA99P9UjnKP0ZLVjrVub2Emu10gCUp2NCCJF'


@Injectable()
export class ApiAccessProvider {
  
  token: Token
  cidades: Cidade[]
  especialidades: Especialidade[]
  slides: Slide[]

  iniciandoBuscaToken =  false
  tokenObtido = false
  cidadesObtidas = false
  especialidadesObtidas = false
  slidesObtidos = false

  @Output() tokenObtidoEvent: EventEmitter<{tokenObtido: boolean}> = new EventEmitter()
  @Output() cidadesObtidasEvent: EventEmitter<{cidadesObtidas: Cidade[]}> = new EventEmitter()
  @Output() especialidadesObtidasEvent: EventEmitter<{especialidadesObtidas: Especialidade[]}> = new EventEmitter()
  @Output() slidesObtidosEvent: EventEmitter<{slidesObtidos: Slide[]}> = new EventEmitter()

  constructor(
    private httpClient: HttpClient
  ) { 
    this.tokenObtidoEvent.subscribe(
      (evento: {tokenObtido: boolean}) => {
        this.tokenObtido = evento.tokenObtido
        
        this.obterCidades().subscribe()
        this.obterEspecialidades().subscribe()
        this.obterSlides().subscribe()

      }
    )

    this.obterToken().subscribe()
  }

  ngOnInit() {


  }


  obterToken(): Observable<Token>{
      this.iniciandoBuscaToken=true
      console.log('ApiService.obterToken() => token sendo buscado ---> ', this.iniciandoBuscaToken)

      let postData = {
        "grant_type" : "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret" : CLIENT_SECRET,
        'scope' : '*',
      }
  
      let httpHeaders: HttpHeaders =  new HttpHeaders({
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
  
      return this.httpClient.post<Token>(URL_API_TOKEN, postData, {headers: httpHeaders})
      .do(
        token => {
          console.log('ApiService.obterToken() => token obtido ---> ', token)
          this.token = token
          this.tokenObtido = true
          console.log('ApiService.obterToken() => emitindo evento ---> tokenObtidoEvent.emit()')
          this.tokenObtidoEvent.emit({tokenObtido: true})
        }
      )
       
    
  }

  getAuthorization(): string{
    return `${this.token.token_type} ${this.token.access_token}`
  }



  obterCidades(): Observable<Cidade[]>{
    if(this.tokenObtido === false && this.iniciandoBuscaToken === true){
      console.log('obterCidades() => identificado token sendo buscando, aguardando evento')
      return this.tokenObtidoEvent
        .do(
          evento => {
            
          }
        )
        .switchMap(

          evento => {
            console.log('obterCidades() => evento ocorreu ---> ', evento)
            return this.obterCidades()
          }  
        )
    }

    if(this.tokenObtido === false && this.iniciandoBuscaToken === false){
      console.log('obterCidades() => token não encontrado ---> obtendo token...')
      return this.obterToken()
              .switchMap(
                token => this.obterCidades()
              )
    }

    let Authorization = this.getAuthorization()

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });

  return this.httpClient.get<CidadeApiData>(`${URL_API+'/cidade'}`, {headers: httpHeaders})
            .map(
              cidadeApiData => cidadeApiData.data
            )
            .map(
              cidades => {
                cidades.forEach(
                  cidade => {
                    cidade.especialidades=this.obterEspecialidadesPorCidade(cidade)
                    cidade.profissionais=this.obterProfissionais(cidade)
                  }
                )
                return cidades
              }
            )
            .switchMap(
              cidades => {
                console.log('obterCidades() => cidades obtidas com sucesso ---> ', cidades)
                this.cidades=cidades
                this.cidadesObtidas=true
                this.cidadesObtidasEvent.emit({cidadesObtidas: cidades})
                return Observable.of(cidades)}
            )
            

  }


  obterEspecialidadesPorCidade(cidade: Cidade): Observable<Especialidade[]>{
    let Authorization = this.getAuthorization()

    console.log('obterEspecialidadesPorCidade => executando...')

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',        
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });

    console.log('obterEspecialidadesPorCidade => antes do forEach = ', cidade)

    
    return this.httpClient.get<Especialidade[]>(
        `${URL_API+'/cidade/'+cidade.id+'/especialidade'}`, 
        {headers: httpHeaders})
            .switchMap(
              especialidades => {
                console.log('obterEspecialidadesPorCidade ---> ',especialidades)
                return Observable.of(especialidades)
              }
            )       

  }

  obterEspecialidades(): Observable<Especialidade[]>{
    let Authorization = this.getAuthorization()

    console.log('obterEspecialidades => executando...')

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',        
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });


    
    return this.httpClient.get<{data: Especialidade[]}>(
        `${URL_API+'/especialidade'}`, 
        {headers: httpHeaders})
            .switchMap(
              (especialidadesObtidas) => {
                console.log('obterEspecialidades => especialidades obtidas com sucesso! ---> ',especialidadesObtidas.data)
                this.especialidades = especialidadesObtidas.data
                this.especialidadesObtidas=true
                this.especialidadesObtidasEvent.emit({especialidadesObtidas: especialidadesObtidas.data})
                return Observable.of(especialidadesObtidas.data)
              }
            )       

  }

  obterEspecialistasPorCidade(cidade_id: number, especialidade_id: number): Observable<Profissional[]>{
    let Authorization = this.getAuthorization()

    console.log('obterEspecialistasPorCidade => executando...')

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',        
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });


    return this.httpClient.get<Profissional[]>(
        `${URL_API+'/cidade/'+cidade_id+'/especialidade/'+especialidade_id}`, 
        {headers: httpHeaders})
            .do(
              profissionais => {
                profissionais.forEach(
                  profissional => {
                    this.obterPlanosPorProfissionalId(profissional.id)
                      .subscribe(
                          planos => {
                            console.log('obterEspecialistasPorCidade => obtido planos do profissional')
                            profissional.planos=planos
                          } 
                      )
                  }
                )
              }
            )
            .switchMap(
              especialistas => {
                console.log('obterEspecialistasPorCidade --> ',especialistas)
                return Observable.of(especialistas)
              }
            )       

  }


  obterProfissionais(cidade: Cidade): Observable<Profissional[]>{
    let Authorization = this.getAuthorization()

    console.log('obterProfissionais => executando...')

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',        
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });

    console.log('obterProfissionais => antes do forEach = ', cidade)

    
    return this.httpClient.get<Profissional[]>(
        `${URL_API+'/cidade/'+cidade.id+'/profissionais'}`, 
        {headers: httpHeaders})
            .do(
              profissionais => {
                profissionais.forEach(
                  profissional => {
                    this.obterPlanosPorProfissionalId(profissional.id)
                      .subscribe(
                          planos => {
                            console.log('obterProfissionais => obtido planos do profissional')
                            profissional.planos=planos
                          } 
                      )
                  }
                )
              }
            )
            .switchMap(
              profissionais => {
                console.log('obterProfissionais => map --> ',profissionais)
                return Observable.of(profissionais)
              }
            )       

  }


  obterPlanosPorProfissionalId(profissional_id: number): Observable<Plano[]>{
    let Authorization = this.getAuthorization()

    console.log('obterPlanosPorProfissionalId => executando...')

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',        
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });

    
    return this.httpClient.get<Plano[]>(
        `${URL_API+'/profissional/'+profissional_id+'/planos'}`, 
        {headers: httpHeaders})
            .switchMap(
              planos => {
                console.log('obterPlanosPorProfissionalId ---> ',planos)
                return Observable.of(planos)
              }
            )       

  }


  obterSlides(): Observable<Slide[]>{
    let Authorization = this.getAuthorization()

    console.log('obterSlides => executando...')
    console.log('obterSlides => tokenObtido? --> ', this.tokenObtido)

    let httpHeaders: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',        
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `${Authorization}`
    });

  
    
    return this.httpClient.get<{data: Slide[]}>(
        `${URL_API+'/slides'}`, 
        {headers: httpHeaders})
            .switchMap(
              slides => {
                console.log('obterSlides => map --> ',slides.data)
                this.slides = slides.data
                this.slidesObtidos=true
                this.slidesObtidosEvent.emit({slidesObtidos: slides.data})
                return Observable.of(slides.data)
              }
            )       

  }

  obterCidadePeloId(cidadeId: number): Cidade{
    let cidadeEncontrada: Cidade

    console.log('ApiAccess => obterCidadePeloId executando...')
    this.cidades.forEach(
      cidade => {
        console.log('ApiAccess => obterCidadePeloId dentro do loop... procurando id='+cidadeId+' na cidade --> ', cidade)
        if(cidade.id == cidadeId){
          console.log('ApiAccess => obterCidadePeloId => cidade encontrada --> ', cidade)
          cidadeEncontrada=cidade
          return
        }
      }
    )

    return cidadeEncontrada

  }

  obterEspecialidadePeloId(especialidadeId: number): Especialidade{
    let especialidadeEncontrada: Especialidade

    console.log('ApiAccess => obterEspecialidadePeloId executando...')
    this.especialidades.forEach(
      especialidade => {
        console.log('ApiAccess => obterEspecialidadePeloId dentro do loop... procurando id='+especialidadeId+' na cidade --> ', especialidade)
        if(especialidade.id == especialidadeId){
          console.log('ApiAccess => obterEspecialidadePeloId => especialidade encontrada --> ', especialidade)
          especialidadeEncontrada=especialidade
          return
        }
      }
    )

    return especialidadeEncontrada

  }



}
