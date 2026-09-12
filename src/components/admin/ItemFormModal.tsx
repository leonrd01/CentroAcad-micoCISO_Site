import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  FileText,
  Calendar,
  Flame,
  Users,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Tag,
  Eye,
  FileCheck
} from 'lucide-react';
import {
  Assembleia,
  CategoriaThematica,
  CATEGORIAS_LISTA,
  ContentStatus,
  Evento,
  Noticia,
  Pauta,
  PautaStatus
} from '../../types';

export type ItemContentType = 'noticia' | 'evento' | 'assembleia' | 'pauta';

interface ItemFormModalProps {
  isOpen: boolean;
  type: ItemContentType;
  initialData?: Noticia | Evento | Assembleia | Pauta | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  type,
  initialData,
  onClose,
  onSave,
}) => {
  // Common Fields
  const [titulo, setTitulo] = useState('');
  const [descricaoConteudo, setDescricaoConteudo] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState<CategoriaThematica>('Acadêmico');
  const [status, setStatus] = useState<ContentStatus>('Publicado');

  // Type-specific fields
  // Notícia
  const [resumo, setResumo] = useState('');
  const [autor, setAutor] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  // Evento & Assembleia
  const [horario, setHorario] = useState('');
  const [local, setLocal] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [tipoEntrada, setTipoEntrada] = useState('');

  // Assembleia
  const [urgente, setUrgente] = useState(false);
  const [estadoAssembleia, setEstadoAssembleia] = useState<'Convocada' | 'Em andamento' | 'Realizada'>('Convocada');
  const [pautasArray, setPautasArray] = useState<string[]>(['1. Informes da Gestão CACISO']);
  const [newPautaInput, setNewPautaInput] = useState('');

  // Pauta
  const [kanbanStatus, setKanbanStatus] = useState<PautaStatus>('Em discussão');
  const [prioridade, setPrioridade] = useState<'Alta' | 'Média' | 'Normal'>('Média');
  const [reivindicacoesArray, setReivindicacoesArray] = useState<string[]>([]);
  const [newReivindicacaoInput, setNewReivindicacaoInput] = useState('');

  // Populate data when editing
  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || '');
      setCategoria(initialData.categoria || 'Acadêmico');
      setData(initialData.data || new Date().toLocaleDateString('pt-BR'));

      if (type === 'noticia') {
        const n = initialData as Noticia;
        setDescricaoConteudo(n.conteudo || '');
        setResumo(n.resumo || '');
        setAutor(n.autor || 'Coordenação CACISO');
        setImagemUrl(n.imagemUrl || '');
        setStatus(n.status || 'Publicado');
      } else if (type === 'evento') {
        const e = initialData as Evento;
        setDescricaoConteudo(e.descricao || '');
        setHorario(e.horario || '17:00');
        setLocal(e.local || 'FFCH - São Lázaro');
        setOrganizador(e.organizador || 'CACISO UFBA');
        setTipoEntrada(e.tipoEntrada || 'Entrada Gratuita');
        setStatus(e.status || 'Publicado');
      } else if (type === 'assembleia') {
        const a = initialData as Assembleia;
        setDescricaoConteudo(a.conteudoCompleto || '');
        setHorario(a.horario || '17:30');
        setLocal(a.local || 'Auditório Isaías Alves (São Lázaro)');
        setUrgente(!!a.urgente);
        setEstadoAssembleia(a.estadoAssembleia || 'Convocada');
        setPautasArray(a.pauta && a.pauta.length > 0 ? a.pauta : ['1. Informes']);
        setStatus(a.status || 'Publicado');
      } else if (type === 'pauta') {
        const p = initialData as Pauta;
        setDescricaoConteudo(p.descricao || '');
        setKanbanStatus(p.kanbanStatus || 'Em discussão');
        setPrioridade(p.prioridade || 'Média');
        setReivindicacoesArray(p.reivindicacoes || []);
        setStatus(p.statusPublicacao || 'Publicado');
      }
    } else {
      // Defaults for creation
      const todayFormatted = new Date().toLocaleDateString('pt-BR');
      setTitulo('');
      setDescricaoConteudo('');
      setData(todayFormatted);
      setCategoria('Acadêmico');
      setStatus('Publicado');

      setResumo('');
      setAutor('Coordenação de Comunicação CACISO');
      setImagemUrl('');

      setHorario('17:00');
      setLocal('Campus de São Lázaro (FFCH)');
      setOrganizador('CACISO UFBA');
      setTipoEntrada('Entrada Livre');

      setUrgente(false);
      setEstadoAssembleia('Convocada');
      setPautasArray(['1. Informes da Gestão CACISO', '2. Deliberação sobre a pauta discente']);

      setKanbanStatus('Em discussão');
      setPrioridade('Média');
      setReivindicacoesArray(['Ampliação de recursos e acompanhamento imediato']);
    }
  }, [initialData, type, isOpen]);

  if (!isOpen) return null;

  const handleAddPautaPoint = () => {
    if (!newPautaInput.trim()) return;
    setPautasArray([...pautasArray, newPautaInput.trim()]);
    setNewPautaInput('');
  };

  const handleRemovePautaPoint = (idx: number) => {
    setPautasArray(pautasArray.filter((_, i) => i !== idx));
  };

  const handleAddReivindicacao = () => {
    if (!newReivindicacaoInput.trim()) return;
    setReivindicacoesArray([...reivindicacoesArray, newReivindicacaoInput.trim()]);
    setNewReivindicacaoInput('');
  };

  const handleRemoveReivindicacao = (idx: number) => {
    setReivindicacoesArray(reivindicacoesArray.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const basePayload = {
      id: initialData?.id || `${type}-${Date.now()}`,
      titulo,
      data,
      categoria,
    };

    let fullPayload: any = {};

    if (type === 'noticia') {
      fullPayload = {
        ...basePayload,
        resumo: resumo || titulo,
        conteudo: descricaoConteudo,
        status,
        autor: autor || 'Coordenação CACISO',
        tempoLeitura: '3 min de leitura',
        imagemUrl: imagemUrl.trim() || undefined,
        destaque: false,
      };
    } else if (type === 'evento') {
      fullPayload = {
        ...basePayload,
        descricao: descricaoConteudo,
        horario,
        local,
        status,
        organizador: organizador || 'CACISO UFBA',
        tipoEntrada: tipoEntrada || 'Aberto ao público',
      };
    } else if (type === 'assembleia') {
      fullPayload = {
        ...basePayload,
        pauta: pautasArray,
        conteudoCompleto: descricaoConteudo,
        horario,
        local,
        status,
        estadoAssembleia,
        urgente,
        atas: (initialData as Assembleia)?.atas || [
          {
            id: `ata-${Date.now()}`,
            titulo: `Convocatoria_${titulo.replace(/\s+/g, '_').slice(0, 20)}.pdf`,
            dataPublicacao: data,
            tamanho: '280 KB',
          },
        ],
      };
    } else if (type === 'pauta') {
      fullPayload = {
        ...basePayload,
        descricao: descricaoConteudo,
        dataAtualizacao: data,
        statusPublicacao: status,
        kanbanStatus,
        prioridade,
        reivindicacoes: reivindicacoesArray,
      };
    }

    onSave(fullPayload);
  };

  const typeLabels: Record<ItemContentType, { title: string; icon: any }> = {
    noticia: { title: 'Notícia / Informe', icon: FileText },
    evento: { title: 'Evento Acadêmico / Cultural', icon: Calendar },
    assembleia: { title: 'Assembleia Estudantil', icon: Flame },
    pauta: { title: 'Pauta e Luta Estudantil', icon: Users },
  };

  const currentMeta = typeLabels[type];
  const IconComponent = currentMeta.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white">
                {initialData ? 'Editar' : 'Cadastrar'} {currentMeta.title}
              </h2>
              <p className="text-xs text-neutral-400">
                Preencha os campos abaixo. As alterações serão salvas imediatamente no protótipo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Título */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 block">
              Título do Conteúdo <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder={`Ex: ${
                type === 'noticia'
                  ? 'Nota sobre a luta por permanência discente...'
                  : type === 'evento'
                  ? 'Mesa Redonda sobre Pensamento Crítico...'
                  : type === 'assembleia'
                  ? 'Assembleia Geral: Pauta de Reivindicação...'
                  : 'Ampliação do RU e Passe Livre...'
              }`}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Row 2: Categoria Temática & Status (Publicado / Rascunho) & Data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Categoria Temática */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 block">
                Categoria Temática <span className="text-red-400">*</span>
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as CategoriaThematica)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
              >
                {CATEGORIAS_LISTA.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status (Rascunho / Publicado) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 block">
                Status da Publicação <span className="text-red-400">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="Publicado">🟢 Publicado (Visível no Site)</option>
                <option value="Rascunho">🟡 Rascunho (Apenas no Admin)</option>
              </select>
            </div>

            {/* Data */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 block">
                Data de Referência
              </label>
              <input
                type="text"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="DD/MM/AAAA"
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Conditional Fields: Notícia */}
          {type === 'noticia' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Resumo / Chamada Curta
                </label>
                <input
                  type="text"
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                  placeholder="Breve resumo para os cards da página inicial..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 block">
                    Autor / Coletivo
                  </label>
                  <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Ex: Gestão CACISO, Coletivo de Comunicação"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 block">
                    URL da Imagem de Capa (opcional)
                  </label>
                  <input
                    type="url"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditional Fields: Evento & Assembleia */}
          {(type === 'evento' || type === 'assembleia') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Horário
                </label>
                <input
                  type="text"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  placeholder="Ex: 17:30 às 20:00"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Local no Campus
                </label>
                <input
                  type="text"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex: Auditório Isaías Alves, Bosque da FFCH"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          {/* Conditional Fields: Assembleia status & Urgency */}
          {type === 'assembleia' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Estado da Assembleia
                </label>
                <select
                  value={estadoAssembleia}
                  onChange={(e) => setEstadoAssembleia(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                >
                  <option value="Convocada">Convocada (Aberta)</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Realizada">Realizada (Finalizada)</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                  <input
                    type="checkbox"
                    checked={urgente}
                    onChange={(e) => setUrgente(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-red-600 focus:ring-red-500"
                  />
                  <span>Destacar como Convocatória Urgente</span>
                </label>
              </div>
            </div>
          )}

          {/* Conditional Fields: Pautas (Kanban) */}
          {type === 'pauta' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Status no Kanban de Lutas
                </label>
                <select
                  value={kanbanStatus}
                  onChange={(e) => setKanbanStatus(e.target.value as PautaStatus)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                >
                  <option value="Em discussão">🟡 Em discussão</option>
                  <option value="Em acompanhamento">🔵 Em acompanhamento</option>
                  <option value="Concluído">🟢 Concluído / Vitória</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Nível de Prioridade
                </label>
                <select
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                >
                  <option value="Alta">🔴 Alta Prioridade</option>
                  <option value="Média">🟡 Média Prioridade</option>
                  <option value="Normal">⚪ Normal</option>
                </select>
              </div>
            </div>
          )}

          {/* Pontos de Pauta (Assembleia) */}
          {type === 'assembleia' && (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-neutral-300 block">
                Pontos de Pauta (Itens para Votação)
              </label>
              <div className="space-y-2">
                {pautasArray.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={p}
                      onChange={(e) => {
                        const updated = [...pautasArray];
                        updated[idx] = e.target.value;
                        setPautasArray(updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePautaPoint(idx)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400"
                      title="Remover ponto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newPautaInput}
                  onChange={(e) => setNewPautaInput(e.target.value)}
                  placeholder="Novo ponto de pauta..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddPautaPoint}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          )}

          {/* Reivindicações (Pauta) */}
          {type === 'pauta' && (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-neutral-300 block">
                Itens e Reivindicações Específicas
              </label>
              <div className="space-y-2">
                {reivindicacoesArray.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={r}
                      onChange={(e) => {
                        const updated = [...reivindicacoesArray];
                        updated[idx] = e.target.value;
                        setReivindicacoesArray(updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveReivindicacao(idx)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newReivindicacaoInput}
                  onChange={(e) => setNewReivindicacaoInput(e.target.value)}
                  placeholder="Adicionar exigência ou cobrança..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddReivindicacao}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Textarea: Conteúdo / Descrição */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 block">
              Conteúdo / Descrição Detalhada <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={descricaoConteudo}
              onChange={(e) => setDescricaoConteudo(e.target.value)}
              placeholder="Escreva aqui o texto completo da publicação, justificativa, orientações para os estudantes..."
              className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shadow-red-950/50"
            >
              <Save className="w-4 h-4" />
              <span>{initialData ? 'Salvar Alterações' : 'Publicar Conteúdo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
