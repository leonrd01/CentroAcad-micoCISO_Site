import React from 'react';
import {
  FileText,
  Calendar,
  Flame,
  Users,
  Shield,
  Plus,
  ArrowRight,
  Sparkles,
  Database,
  ExternalLink,
  Clock,
  Layers
} from 'lucide-react';
import {
  AdminViewType,
  Assembleia,
  Evento,
  Noticia,
  Pauta,
  UserAdmin
} from '../../types';

interface AdminOverviewProps {
  noticias: Noticia[];
  eventos: Evento[];
  assembleias: Assembleia[];
  pautas: Pauta[];
  users: UserAdmin[];
  currentUser: UserAdmin | null;
  onNavigateTab: (tab: AdminViewType) => void;
  onOpenCreateNoticia: () => void;
  onOpenCreateEvento: () => void;
  onOpenCreateAssembleia: () => void;
  onOpenCreatePauta: () => void;
  onViewPublicSite: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  noticias,
  eventos,
  assembleias,
  pautas,
  users,
  currentUser,
  onNavigateTab,
  onOpenCreateNoticia,
  onOpenCreateEvento,
  onOpenCreateAssembleia,
  onOpenCreatePauta,
  onViewPublicSite,
}) => {
  const publishedNoticias = noticias.filter((n) => n.status === 'Publicado').length;
  const draftNoticias = noticias.length - publishedNoticias;

  const publishedEventos = eventos.filter((e) => e.status === 'Publicado').length;
  const draftEventos = eventos.length - publishedEventos;

  const publishedAssembleias = assembleias.filter((a) => a.status === 'Publicado').length;
  const urgentCount = assembleias.filter((a) => a.urgente).length;

  const pautasEmLuta = pautas.filter((p) => p.kanbanStatus !== 'Concluído').length;
  const pautasVitoriosas = pautas.filter((p) => p.kanbanStatus === 'Concluído').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-300 text-xs font-semibold border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestão Conectada: {currentUser?.cargoGestao || 'Coordenação CACISO'}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Saudações, {currentUser?.nome || 'Camarada'}!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Este é o painel de controle operacional do CACISO. Aqui você gerencia publicações, agendas, assembleias de base e o quadro de pautas e lutas da categoria.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onViewPublicSite}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ver Site Público</span>
          </button>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Notícias */}
        <div
          onClick={() => onNavigateTab('noticias')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-red-600/60 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-neutral-400">Notícias</span>
            <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 text-red-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white font-display">
              {noticias.length}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              <span className="text-emerald-400 font-semibold">{publishedNoticias} publicadas</span> • {draftNoticias} rascunhos
            </p>
          </div>
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-red-400 font-medium">
            <span>Acessar notícias</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Eventos */}
        <div
          onClick={() => onNavigateTab('eventos')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-teal-600/60 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-neutral-400">Eventos</span>
            <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white font-display">
              {eventos.length}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              <span className="text-teal-400 font-semibold">{publishedEventos} ativos</span> • {draftEventos} em preparação
            </p>
          </div>
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-teal-400 font-medium">
            <span>Acessar eventos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Assembleias */}
        <div
          onClick={() => onNavigateTab('assembleias')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-600/60 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-neutral-400">Assembleias</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white font-display">
              {assembleias.length}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              <span className="text-amber-400 font-semibold">{urgentCount} urgente</span> • {publishedAssembleias} com ata
            </p>
          </div>
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-amber-400 font-medium">
            <span>Acessar assembleias</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pautas */}
        <div
          onClick={() => onNavigateTab('pautas')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-rose-600/60 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-neutral-400">Pautas de Luta</span>
            <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white font-display">
              {pautas.length}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              <span className="text-rose-400 font-semibold">{pautasEmLuta} em mobilização</span> • {pautasVitoriosas} vitórias
            </p>
          </div>
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-rose-400 font-medium">
            <span>Acessar quadro Kanban</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Content Creation Shortcuts */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h3 className="font-display font-bold text-base text-white">
          Ações Rápidas de Cadastro
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={onOpenCreateNoticia}
            className="p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Nova Notícia</p>
              <p className="text-[10px] text-neutral-400">Informe discente</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreateEvento}
            className="p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-teal-600/20 text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Novo Evento</p>
              <p className="text-[10px] text-neutral-400">Debate ou ato</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreateAssembleia}
            className="p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Nova Assembleia</p>
              <p className="text-[10px] text-neutral-400">Edital e pauta</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreatePauta}
            className="p-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-rose-600/20 text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Nova Pauta</p>
              <p className="text-[10px] text-neutral-400">Quadro Kanban</p>
            </div>
          </button>
        </div>
      </div>

      {/* Architecture & Future Firebase Integration Note (Directly acknowledging user architecture requirement) */}
      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-sky-950 border border-sky-800 text-sky-400 shrink-0">
          <Database className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-bold text-white text-sm">
            Arquitetura de Dados Front-end (Pronta para Backend & Firebase)
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Todas as operações de criação, edição, alteração de status e exclusão estão desacopladas e operando via estado reativo (<code className="text-red-400">useState</code>) com interfaces TypeScript estritas. Quando for integrar o Firebase/Firestore e autenticação, os manipuladores no componente raiz já possuem a assinatura e os esquemas estruturados para conexão direta com coleções (<code className="text-neutral-300">noticias</code>, <code className="text-neutral-300">eventos</code>, <code className="text-neutral-300">assembleias</code>, <code className="text-neutral-300">pautas</code>, <code className="text-neutral-300">usuarios</code>).
          </p>
        </div>
      </div>
    </div>
  );
};
