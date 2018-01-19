import { Observable } from 'rxjs/Observable';
import { Especialidade } from './especialidade.model';
import { Profissional } from './profissional.model';

class Cidade{
    id: number
    nome: string
    especialidades: Observable<Especialidade[]>
    profissionais: Observable<Profissional[]>
  }

  class CidadeApiData{
    current_page:number
    data: Cidade[]
    first_page_url: string
  }
  

  export {Cidade, CidadeApiData}