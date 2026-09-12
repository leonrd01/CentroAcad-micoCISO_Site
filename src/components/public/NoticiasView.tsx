import React, { useState } from 'react';
import { Search, Calendar, User, Clock, ChevronRight, Filter, Sparkles } from 'lucide-react';
import { CategoriaThematica, CATEGORIAS_LISTA, Noticia } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface NoticiasViewProps {
  noticias: Noticia[];
  onSelectNoticia: (noticia: Noticia) => void;
}

export const NoticiasView: React.FC<NoticiasViewProps> = ({ noticias, onSelectNoticia }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaThematica | 'Todas'>('Todas');

  const publishedNoticias = noticias.filter((n) => n.status === 'Publicado');

  const filteredNoticias = publishedNoticias.filter((n) => {
    const matchesSearch =
      n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.conteudo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoria === 'Todas' || n.categoria === selectedCategoria;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Informação Combativa & Transparência</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Notícias, Comunicados & Informes
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
          Fique por dentro das deliberações, notas políticas, denúncias e conquistas do movimento estudantil de Ciências Sociais da UFBA.
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
            placeholder="Pesquisar por título, palavra-chave ou conteúdo..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 flex items-center gap-1 font-medium shrink-0 pr-1">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            Filtrar:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategoria('Todas')}
            className={`px-3 py-1 rounded-full border transition-all shrink-0 ${
              selectedCategoria === 'Todas'
                ? 'bg-neutral-100 text-neutral-900 border-white font-bold'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            Todas as Notícias ({publishedNoticias.length})
          </button>
          {CATEGORIAS_LISTA.map((cat) => {
            const count = publishedNoticias.filter((n) => n.categoria === cat).length;
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

      {/* Content Grid */}
      {filteredNoticias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNoticias.map((noticia) => (
            <article
              key={noticia.id}
              onClick={() => onSelectNoticia(noticia)}
              className="group flex flex-col justify-between rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer overflow-hidden"
            >
              {noticia.imagemUrl && (
                <div className="aspect-video w-full overflow-hidden border-b border-neutral-800 bg-neutral-950">
                  <img
                    src={noticia.imagemUrl}
                    alt={noticia.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6 space-y-3 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <CategoryBadge categoria={noticia.categoria} size="sm" />
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-500" />
                    {noticia.data}
                  </span>
                </div>

                <h2 className="font-display font-bold text-lg text-white group-hover:text-red-400 transition-colors line-clamp-2">
                  {noticia.titulo}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {noticia.resumo}
                </p>
              </div>

              <div className="px-6 py-3.5 border-t border-neutral-800/80 bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-400">
                <span className="truncate max-w-[170px] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  {noticia.autor}
                </span>
                <span className="font-semibold text-red-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Ler matéria completa <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
          <p className="text-base text-neutral-300 font-semibold">
            Nenhuma publicação encontrada para os filtros selecionados.
          </p>
          <p className="text-xs text-neutral-400">
            Tente remover os termos de busca ou selecionar outra categoria temática.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategoria('Todas');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};
