class Plano{
    id: number
    nome: string
    pivo: PivoPlanoProfissional
  }

class PivoPlanoProfissional{
    profissional_id: number
    plano_id: number
}

export {Plano, PivoPlanoProfissional}