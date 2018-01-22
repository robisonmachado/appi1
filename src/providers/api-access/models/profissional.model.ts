import { Plano } from "../api-access.module";

class Profissional{
    id: number
    nome: string
    especialidade_id: number
    telefone1: string
    telefone2: string
    whatsapp: string
    foto: string
    planos: Plano[]
  }

export {Profissional}