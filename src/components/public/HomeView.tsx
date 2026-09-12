import React from 'react';
import {
  Flame,
  Calendar,
  FileText,
  Clock,
  MapPin,
  ArrowRight,
  AlertTriangle,
  Megaphone,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';
import { Assembleia, CategoriaThematica, Evento, Noticia, Pauta, PublicViewType } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface HomeViewProps {
  noticias: Noticia[];
  eventos: Evento[];
  assembleias: Assembleia[];
  pautas: Pauta[];
  onNavigate: (view: PublicViewType) => void;
  onSelectNoticia: (noticia: Noticia) => void;
  onSelectAssembleia: (assembleia: Assembleia) => void;
  onSelectCategoria: (categoria: CategoriaThematica) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  noticias,
  eventos,
  assembleias,
  pautas,
  onNavigate,
  onSelectNoticia,
  onSelectAssembleia,
  onSelectCategoria,
}) => {
  // Filter for published items only on the public view
  const publishedNoticias = noticias.filter((n) => n.status === 'Publicado');
  const publishedEventos = eventos.filter((e) => e.status === 'Publicado');
  const publishedAssembleias = assembleias.filter((a) => a.status === 'Publicado');
  const urgentAssembleia = publishedAssembleias.find((a) => a.urgente && a.estadoAssembleia === 'Convocada');

  const pautasEmDiscussao = pautas.filter((p) => p.kanbanStatus === 'Em discussão').length;
  const pautasEmAcompanhamento = pautas.filter((p) => p.kanbanStatus === 'Em acompanhamento').length;
  const pautasConcluidas = pautas.filter((p) => p.kanbanStatus === 'Concluído').length;

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-red-700/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-amber-600/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Urgent Announcement Banner if active */}
          {urgentAssembleia && (
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-950 via-red-900/60 to-neutral-900 border-2 border-red-600/80 shadow-xl shadow-red-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0 shadow-md">
                  <Flame className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-red-300">
                      Convocação Urgente de Assembleia Geral
                    </span>
                    <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                      {urgentAssembleia.data}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 mt-0.5">
                    {urgentAssembleia.titulo}
                  </h3>
                  <p className="text-xs text-red-200/90 mt-0.5 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{urgentAssembleia.horario}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{urgentAssembleia.local}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectAssembleia(urgentAssembleia)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-transform active:scale-95 shadow"
              >
                Ver Pauta & Edital
              </button>
            </div>
          )}

          {/* Main Hero Card */}
          <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800/90 p-6 sm:p-10 lg:p-14 relative overflow-hidden backdrop-blur-sm">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 text-red-400 border border-neutral-700/80 text-xs font-semibold">
                <Megaphone className="w-3.5 h-3.5 text-red-500" />
                <span>Portal da Gestão Discente • São Lázaro, Salvador</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Ciências Sociais em Luta: <span className="text-red-500">Pela Universidade Pública</span>, Popular e Crítica.
              </h1>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Bem-vindo ao portal do <strong className="text-white font-semibold">CACISO UFBA</strong>. Espaço autônomo de organização, acolhimento, denúncia e mobilização combativa dos estudantes de Ciências Sociais da Colina de São Lázaro.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('assembleias')}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-950/60 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>Participar das Assembleias</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('pautas')}
                  className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-sm transition-all border border-neutral-700 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Quadro de Pautas & Lutas</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('noticias')}
                  className="px-5 py-3 rounded-xl hover:bg-neutral-800/80 text-neutral-300 hover:text-white font-medium text-sm transition-colors flex items-center gap-1.5"
                >
                  <span>Ver Informes Recentes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Summary Pill Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-800/80">
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <p className="text-2xl font-extrabold text-white font-display">{publishedNoticias.length}</p>
                <p className="text-xs text-neutral-400">Informes Públicos</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <p className="text-2xl font-extrabold text-red-400 font-display">{pautasEmDiscussao + pautasEmAcompanhamento}</p>
                <p className="text-xs text-neutral-400">Pautas Ativas em Luta</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <p className="text-2xl font-extrabold text-emerald-400 font-display">{pautasConcluidas}</p>
                <p className="text-xs text-neutral-400">Conquistas Vitoriosas</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <p className="text-2xl font-extrabold text-amber-400 font-display">{publishedAssembleias.length}</p>
                <p className="text-xs text-neutral-400">Assembleias & Atas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE DESTAQUES (Notícias, Eventos, Assembleias) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Row 1: Últimas Notícias e Informes */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Comunicação & Luta</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Últimas Notícias e Comunicados
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('noticias')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedNoticias.slice(0, 3).map((noticia) => (
              <article
                key={noticia.id}
                onClick={() => onSelectNoticia(noticia)}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
              >
                <div className="space-y-4">
                  {noticia.imagemUrl && (
                    <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800">
                      <img
                        src={noticia.imagemUrl}
                        alt={noticia.titulo}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <CategoryBadge categoria={noticia.categoria} />
                    <span className="text-xs text-neutral-400">{noticia.data}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {noticia.titulo}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {noticia.resumo}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span className="truncate max-w-[180px]">{noticia.autor}</span>
                  <span className="font-semibold text-red-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Ler informe <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Row 2: Próximos Eventos & Assembleias Urgentes (Split layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Col Left: Próximos Eventos (7 cols) */}
          <section className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>Agenda da Colina</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Próximos Eventos & Formação
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('eventos')}
                className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <span>Agenda completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {publishedEventos.slice(0, 3).map((evento) => (
                <div
                  key={evento.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all"
                >
                  {/* Date badge */}
                  <div className="w-16 h-16 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-red-400 font-extrabold text-xl leading-tight">
                      {evento.data.split('/')[0]}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      SET
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CategoryBadge categoria={evento.categoria} size="sm" />
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        {evento.horario}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white hover:text-teal-300 transition-colors">
                      {evento.titulo}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span>{evento.local}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Col Right: Assembleias Urgentes e Deliberativas (5 cols) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>Poder Estudantil</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Assembleias Gerais
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('assembleias')}
                className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <span>Todas & Atas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {publishedAssembleias.slice(0, 2).map((assembleia) => (
                <div
                  key={assembleia.id}
                  onClick={() => onSelectAssembleia(assembleia)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    assembleia.urgente
                      ? 'bg-gradient-to-br from-red-950/70 to-neutral-900 border-red-700/80 hover:border-red-500 shadow-md'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        assembleia.estadoAssembleia === 'Convocada'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {assembleia.estadoAssembleia}
                    </span>
                    <span className="text-xs text-neutral-400">{assembleia.data}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white hover:text-amber-300 transition-colors line-clamp-2">
                    {assembleia.titulo}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="truncate">{assembleia.local}</span>
                  </p>

                  <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">{assembleia.pauta.length} pontos de pauta</span>
                    <span className="text-amber-400 font-semibold inline-flex items-center gap-1">
                      Ver convocatória <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 3. QUICK CATEGORY TEASER (Filtro Global) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Exploração Temática</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                Navegue por Categorias de Ação e Conteúdo
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Filtre notícias, eventos, assembleias e lutas com um único clique temático.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('categorias')}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold self-start sm:self-auto flex items-center gap-2"
            >
              <span>Abrir Painel de Categorias</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
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
            ].map((cat) => (
              <CategoryBadge
                key={cat}
                categoria={cat as CategoriaThematica}
                size="md"
                interactive
                onClick={() => {
                  onSelectCategoria(cat as CategoriaThematica);
                  onNavigate('categorias');
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
