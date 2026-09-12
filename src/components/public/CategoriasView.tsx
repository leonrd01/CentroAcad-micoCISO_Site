import React from 'react';
import {
  Layers,
  FileText,
  Calendar,
  Flame,
  Users,
  Clock,
  MapPin,
  ChevronRight,
  Inbox,
  ArrowUpRight
} from 'lucide-react';
import {
  Assembleia,
  CategoriaThematica,
  CATEGORIAS_LISTA,
  Evento,
  Noticia,
  Pauta
} from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface CategoriasViewProps {
  selectedCategoria: CategoriaThematica;
  onSelectCategoria: (categoria: CategoriaThematica) => void;
  noticias: Noticia[];
  eventos: Evento[];
  assembleias: Assembleia[];
  pautas: Pauta[];
  onSelectNoticia: (noticia: Noticia) => void;
  onSelectAssembleia: (assembleia: Assembleia) => void;
}

export const CategoriasView: React.FC<CategoriasViewProps> = ({
  selectedCategoria,
  onSelectCategoria,
  noticias,
  eventos,
  assembleias,
  pautas,
  onSelectNoticia,
  onSelectAssembleia,
}) => {
  // Only published items for public view
  const publishedNoticias = noticias.filter((n) => n.status === 'Publicado');
  const publishedEventos = eventos.filter((e) => e.status === 'Publicado');
  const publishedAssembleias = assembleias.filter((a) => a.status === 'Publicado');
  const publishedPautas = pautas.filter((p) => p.statusPublicacao === 'Publicado');

  // Filter items matching the selected category
  const filteredNoticias = publishedNoticias.filter(
    (item) => item.categoria === selectedCategoria
  );
  const filteredEventos = publishedEventos.filter(
    (item) => item.categoria === selectedCategoria
  );
  const filteredAssembleias = publishedAssembleias.filter(
    (item) => item.categoria === selectedCategoria
  );
  const filteredPautas = publishedPautas.filter(
    (item) => item.categoria === selectedCategoria
  );

  const totalItems =
    filteredNoticias.length +
    filteredEventos.length +
    filteredAssembleias.length +
    filteredPautas.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header & Explanation */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/80 text-purple-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Filtro Global Unificado</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Categorias Temáticas & Articulação de Luta
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
          Selecione uma categoria temática para visualizar simultaneamente todas as notícias, eventos, assembleias e pautas associadas a essa frente de atuação.
        </p>
      </div>

      {/* 2. Grid de Botões/Tags de Categorias Temáticas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase font-bold tracking-wider text-neutral-400">
            Selecione uma Categoria:
          </p>
          <span className="text-xs text-neutral-400">
            Categoria ativa: <strong className="text-red-400">{selectedCategoria}</strong> ({totalItems} itens vinculados)
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {CATEGORIAS_LISTA.map((categoria) => {
            const isSelected = selectedCategoria === categoria;
            const notCount = publishedNoticias.filter((i) => i.categoria === categoria).length;
            const evtCount = publishedEventos.filter((i) => i.categoria === categoria).length;
            const assCount = publishedAssembleias.filter((i) => i.categoria === categoria).length;
            const pauCount = publishedPautas.filter((i) => i.categoria === categoria).length;
            const catTotal = notCount + evtCount + assCount + pauCount;

            return (
              <button
                key={categoria}
                type="button"
                onClick={() => onSelectCategoria(categoria)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/50 scale-105 ring-2 ring-red-400 ring-offset-2 ring-offset-neutral-950'
                    : 'bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                <span>{categoria}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-red-800 text-white' : 'bg-neutral-800 text-neutral-400 group-hover:text-white'
                  }`}
                >
                  {catTotal}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Overview Badge Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 uppercase font-bold">Exibindo conteúdos de:</span>
          <CategoryBadge categoria={selectedCategoria} size="lg" />
        </div>
        <span className="text-xs text-neutral-400">
          Total de 4 blocos verticais estruturados
        </span>
      </div>

      {/* 3. OS 4 BLOCOS VERTICAIS BEM DISTINTOS */}
      <div className="space-y-12">
        {/* BLOCO 1: 📰 Notícias e Informes relacionados */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/90">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/70 border border-red-800 flex items-center justify-center text-red-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  1. Notícias e Informes Relacionados
                </h2>
                <p className="text-xs text-neutral-400">
                  Publicações e comunicados oficiais categorizados como "{selectedCategoria}"
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold">
              {filteredNoticias.length} {filteredNoticias.length === 1 ? 'notícia' : 'notícias'}
            </span>
          </div>

          {filteredNoticias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredNoticias.map((noticia) => (
                <div
                  key={noticia.id}
                  onClick={() => onSelectNoticia(noticia)}
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>{noticia.data}</span>
                      <span className="text-red-400 font-medium">{noticia.autor}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {noticia.titulo}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {noticia.resumo}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-red-400 font-semibold">
                    <span>Ler matéria completa</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-neutral-500 italic bg-neutral-950/50 rounded-2xl border border-dashed border-neutral-800">
              Nenhuma notícia cadastrada sob a categoria "{selectedCategoria}".
            </div>
          )}
        </section>

        {/* BLOCO 2: 📅 Eventos relacionados */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/90">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-950/70 border border-teal-800 flex items-center justify-center text-teal-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  2. Eventos Relacionados
                </h2>
                <p className="text-xs text-neutral-400">
                  Mesas, oficinas, debates e atos convocados na temática "{selectedCategoria}"
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold">
              {filteredEventos.length} {filteredEventos.length === 1 ? 'evento' : 'eventos'}
            </span>
          </div>

          {filteredEventos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {filteredEventos.map((evento) => (
                <div
                  key={evento.id}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {evento.data}
                    </span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {evento.horario}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white">
                    {evento.titulo}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {evento.descricao}
                  </p>
                  <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{evento.local}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-neutral-500 italic bg-neutral-950/50 rounded-2xl border border-dashed border-neutral-800">
              Nenhum evento registrado sob a categoria "{selectedCategoria}".
            </div>
          )}
        </section>

        {/* BLOCO 3: 🏛️ Assembleias relacionadas */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/90">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/70 border border-amber-800 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  3. Assembleias Relacionadas
                </h2>
                <p className="text-xs text-neutral-400">
                  Deliberações de base e instâncias de poder estudantil sobre "{selectedCategoria}"
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold">
              {filteredAssembleias.length} {filteredAssembleias.length === 1 ? 'assembleia' : 'assembleias'}
            </span>
          </div>

          {filteredAssembleias.length > 0 ? (
            <div className="space-y-4 pt-2">
              {filteredAssembleias.map((assembleia) => (
                <div
                  key={assembleia.id}
                  onClick={() => onSelectAssembleia(assembleia)}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-600/60 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-800 text-amber-300 border border-neutral-700">
                        {assembleia.estadoAssembleia}
                      </span>
                      <span className="text-xs text-neutral-400">{assembleia.data} • {assembleia.horario}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white hover:text-amber-300">
                      {assembleia.titulo}
                    </h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{assembleia.local}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs text-amber-400 font-semibold inline-flex items-center gap-1">
                      Ver Pauta & Atas <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-neutral-500 italic bg-neutral-950/50 rounded-2xl border border-dashed border-neutral-800">
              Nenhuma assembleia vinculada diretamente à categoria "{selectedCategoria}".
            </div>
          )}
        </section>

        {/* BLOCO 4: ✊ Pautas e Lutas relacionadas */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/90">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-950/70 border border-rose-800 flex items-center justify-center text-rose-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  4. Pautas e Lutas Relacionadas
                </h2>
                <p className="text-xs text-neutral-400">
                  Reivindicações históricas e frentes de mobilização ativas em "{selectedCategoria}"
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold">
              {filteredPautas.length} {filteredPautas.length === 1 ? 'pauta' : 'pautas'}
            </span>
          </div>

          {filteredPautas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {filteredPautas.map((pauta) => (
                <div
                  key={pauta.id}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        pauta.kanbanStatus === 'Em discussão'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : pauta.kanbanStatus === 'Em acompanhamento'
                          ? 'bg-sky-950 text-sky-300 border border-sky-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {pauta.kanbanStatus}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Atualizado em {pauta.dataAtualizacao}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white">
                    {pauta.titulo}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pauta.descricao}
                  </p>

                  {pauta.reivindicacoes.length > 0 && (
                    <div className="pt-2 border-t border-neutral-800/80">
                      <p className="text-[10px] uppercase font-bold text-neutral-500">
                        {pauta.reivindicacoes.length} pontos de cobrança protocolados
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-neutral-500 italic bg-neutral-950/50 rounded-2xl border border-dashed border-neutral-800">
              Nenhuma pauta ou reivindicação catalogada com a tag "{selectedCategoria}".
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
