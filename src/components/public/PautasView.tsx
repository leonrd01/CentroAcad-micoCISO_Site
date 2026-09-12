import React, { useState } from 'react';
import {
  Kanban,
  List,
  Search,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  Filter,
  Sparkles,
  Layers
} from 'lucide-react';
import { CategoriaThematica, CATEGORIAS_LISTA, Pauta, PautaStatus } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface PautasViewProps {
  pautas: Pauta[];
}

export const PautasView: React.FC<PautasViewProps> = ({ pautas }) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaThematica | 'Todas'>('Todas');

  const publishedPautas = pautas.filter((p) => p.statusPublicacao === 'Publicado');

  const filteredPautas = publishedPautas.filter((p) => {
    const matchesSearch =
      p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategoria === 'Todas' || p.categoria === selectedCategoria;
    return matchesSearch && matchesCategory;
  });

  const columns: { status: PautaStatus; title: string; subtitle: string; color: string; border: string; bg: string }[] = [
    {
      status: 'Em discussão',
      title: 'Em Discussão',
      subtitle: 'Debates em assembleias e comissões de base',
      color: 'text-amber-400',
      border: 'border-amber-700/60',
      bg: 'bg-amber-950/20',
    },
    {
      status: 'Em acompanhamento',
      title: 'Em Acompanhamento',
      subtitle: 'Negociação ativa com a PROAE/Reitoria',
      color: 'text-sky-400',
      border: 'border-sky-700/60',
      bg: 'bg-sky-950/20',
    },
    {
      status: 'Concluído',
      title: 'Concluído / Vitória',
      subtitle: 'Conquistas consolidadas para os estudantes',
      color: 'text-emerald-400',
      border: 'border-emerald-700/60',
      bg: 'bg-emerald-950/20',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/80 text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparência de Reivindicações</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Quadro de Pautas & Lutas Estudantis
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Acompanhe a tramitação das bandeiras históricas e reivindicações emergenciais de Ciências Sociais da UFBA.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'kanban'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Quadro Kanban</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Lista Compacta</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar pauta por reivindicação, tema..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategoria('Todas')}
            className={`px-3 py-1 rounded-full border transition-all shrink-0 ${
              selectedCategoria === 'Todas'
                ? 'bg-neutral-100 text-neutral-900 border-white font-bold'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            Todas ({publishedPautas.length})
          </button>
          {CATEGORIAS_LISTA.map((cat) => {
            const count = publishedPautas.filter((p) => p.categoria === cat).length;
            if (count === 0 && selectedCategoria !== cat) return null;
            return (
              <CategoryBadge
                key={cat}
                categoria={cat}
                size="sm"
                interactive
                active={selectedCategoria === cat}
                onClick={() =>
                  setSelectedCategoria(selectedCategoria === cat ? 'Todas' : cat)
                }
              />
            );
          })}
        </div>
      </div>

      {/* View Mode: Kanban Columns */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {columns.map((col) => {
            const colPautas = filteredPautas.filter((p) => p.kanbanStatus === col.status);

            return (
              <div
                key={col.status}
                className={`rounded-2xl border ${col.border} ${col.bg} p-4 sm:p-5 space-y-4`}
              >
                {/* Column header */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <h3 className={`font-display font-bold text-base ${col.color}`}>
                      {col.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400">{col.subtitle}</p>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs font-bold text-white">
                    {colPautas.length}
                  </span>
                </div>

                {/* Cards in column */}
                <div className="space-y-4">
                  {colPautas.map((pauta) => (
                    <div
                      key={pauta.id}
                      className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-all space-y-3.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <CategoryBadge categoria={pauta.categoria} size="sm" />
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            pauta.prioridade === 'Alta'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {pauta.prioridade} Prioridade
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                        {pauta.titulo}
                      </h4>

                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {pauta.descricao}
                      </p>

                      {/* Reivindicações list */}
                      {pauta.reivindicacoes.length > 0 && (
                        <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                            Reivindicações Centrais:
                          </p>
                          <ul className="space-y-1 text-xs text-neutral-300">
                            {pauta.reivindicacoes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                                <span className="text-red-400 font-bold">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                        <span>Atualizado: {pauta.dataAtualizacao}</span>
                        <span className="font-medium text-neutral-400">UFBA São Lázaro</span>
                      </div>
                    </div>
                  ))}

                  {colPautas.length === 0 && (
                    <div className="text-center py-8 px-4 rounded-xl border border-dashed border-neutral-800 text-xs text-neutral-500">
                      Nenhuma pauta nesta etapa no momento.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View Mode: List */
        <div className="space-y-4">
          {filteredPautas.map((pauta) => (
            <div
              key={pauta.id}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge categoria={pauta.categoria} size="sm" />
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      pauta.kanbanStatus === 'Em discussão'
                        ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                        : pauta.kanbanStatus === 'Em acompanhamento'
                        ? 'bg-sky-950/70 text-sky-300 border border-sky-800'
                        : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {pauta.kanbanStatus}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Última atualização: {pauta.dataAtualizacao}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  {pauta.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  {pauta.descricao}
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-xs text-neutral-400 block">
                  {pauta.reivindicacoes.length} reivindicações mapeadas
                </span>
                <span className="text-xs font-bold text-red-400">
                  Prioridade {pauta.prioridade}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
