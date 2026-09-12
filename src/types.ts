export type CategoriaThematica =
  | 'Acadêmico'
  | 'CACISO'
  | 'Assembleia'
  | 'Mobilização'
  | 'UFBA'
  | 'São Lázaro'
  | 'Permanência'
  | 'Formação'
  | 'Cultura'
  | 'Movimentos e Lutas'
  | 'Eventos';

export const CATEGORIAS_LISTA: CategoriaThematica[] = [
  'Acadêmico',
  'CACISO',
  'Assembleia',
  'Mobilização',
  'UFBA',
  'São Lázaro',
  'Permanência',
  'Formação',
  'Cultura',
  'Movimentos e Lutas',
  'Eventos',
];

export type ContentStatus = 'Publicado' | 'Rascunho';

export type PautaStatus = 'Em discussão' | 'Em acompanhamento' | 'Concluído';

export interface AtaDocumento {
  id: string;
  titulo: string;
  dataPublicacao: string;
  tamanho: string;
  urlSimulada?: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  data: string;
  categoria: CategoriaThematica;
  status: ContentStatus;
  autor: string;
  tempoLeitura?: string;
  destaque?: boolean;
  imagemUrl?: string;
}

export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  categoria: CategoriaThematica;
  status: ContentStatus;
  organizador: string;
  tipoEntrada?: string;
}

export interface Assembleia {
  id: string;
  titulo: string;
  pauta: string[];
  conteudoCompleto?: string;
  data: string;
  horario: string;
  local: string;
  categoria: CategoriaThematica;
  status: ContentStatus;
  estadoAssembleia: 'Convocada' | 'Em andamento' | 'Realizada';
  urgente?: boolean;
  atas: AtaDocumento[];
}

export interface Pauta {
  id: string;
  titulo: string;
  descricao: string;
  conteudo?: string;
  data: string;
  dataAtualizacao: string;
  categoria: CategoriaThematica;
  statusPublicacao: ContentStatus;
  kanbanStatus: PautaStatus;
  prioridade: 'Alta' | 'Média' | 'Normal';
  reivindicacoes: string[];
}

export type UserRole = 'Administrador Principal' | 'Administrador de Conteúdo';

export interface UserAdmin {
  id: string;
  nome: string;
  email: string;
  papel: UserRole;
  cargoGestao: string;
  status: 'Ativo' | 'Inativo';
  ultimoAcesso: string;
}

export type PublicViewType =
  | 'inicio'
  | 'noticias'
  | 'eventos'
  | 'assembleias'
  | 'pautas'
  | 'categorias';

export type AdminViewType =
  | 'overview'
  | 'noticias'
  | 'eventos'
  | 'assembleias'
  | 'pautas'
  | 'usuarios';
