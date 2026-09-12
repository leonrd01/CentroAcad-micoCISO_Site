import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Users, Tag, Check, Share2, Sparkles } from 'lucide-react';
import { CategoriaThematica, CATEGORIAS_LISTA, Evento } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface EventosViewProps {
  eventos: Evento[];
}

export const EventosView: React.FC<EventosViewProps> = ({ eventos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaThematica | 'Todas'>('Todas');
  const [confirmedEvents, setConfirmedEvents] = useState<Record<string, boolean>>({});

  const publishedEventos = eventos.filter((e) => e.status === 'Publicado');

  const filteredEventos = publishedEventos.filter((e) => {
    const matchesSearch =
      e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.local.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoria === 'Todas' || e.categoria === selectedCategoria;

    return matchesSearch && matchesCategory;
  });

  const toggleConfirm = (id: string, title: string) => {
    setConfirmedEvents((prev) => {
      const newState = !prev[id];
      if (newState) {
        alert(`Presença confirmada no evento: "${title}". Anotado na agenda do CACISO!`);
      }
      return { ...prev, [id]: newState };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800/80 text-teal-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Formação Política, Cultura & Mobilização</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Agenda de Eventos & Encontros
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
          Acompanhe os debates, calouradas, oficinas e atos programados para o campus de São Lázaro e demais espaços da UFBA.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar evento por nome, local em São Lázaro..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-teal-500 transition-colors"
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
            Todos os Eventos ({publishedEventos.length})
          </button>
          {CATEGORIAS_LISTA.map((cat) => {
            const count = publishedEventos.filter((e) => e.categoria === cat).length;
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

      {/* Events Grid */}
      {filteredEventos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEventos.map((evento) => {
            const isConfirmed = !!confirmedEvents[evento.id];
            const [dia, mes] = evento.data.split('/');

            return (
              <div
                key={evento.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Date Block */}
                    <div className="w-16 h-16 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-teal-400 font-extrabold text-2xl leading-none">
                        {dia}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mt-1">
                        {mes === '09' ? 'SET' : mes === '10' ? 'OUT' : mes}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-end">
                      <CategoryBadge categoria={evento.categoria} size="sm" />
                      {evento.tipoEntrada && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {evento.tipoEntrada}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-teal-300 transition-colors">
                    {evento.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {evento.descricao}
                  </p>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-300">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                      <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{evento.horario}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{evento.local}</span>
                    </div>
                  </div>
                </div>

                {/* Footer and Interactive Button */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Org: {evento.organizador}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleConfirm(evento.id, evento.titulo)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isConfirmed
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                    }`}
                  >
                    {isConfirmed ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Presença Confirmada!</span>
                      </>
                    ) : (
                      <span>Confirmar Presença</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
          <p className="text-base text-neutral-300 font-semibold">
            Nenhum evento encontrado para este filtro.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategoria('Todas');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white"
          >
            Ver todos os eventos
          </button>
        </div>
      )}
    </div>
  );
};
