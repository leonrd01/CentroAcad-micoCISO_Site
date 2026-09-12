import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  Clock,
  MapPin,
  FileDown,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Download
} from 'lucide-react';
import { Assembleia } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface AssembleiasViewProps {
  assembleias: Assembleia[];
  onSelectAssembleia: (assembleia: Assembleia) => void;
}

export const AssembleiasView: React.FC<AssembleiasViewProps> = ({
  assembleias,
  onSelectAssembleia,
}) => {
  const [filterState, setFilterState] = useState<'Todas' | 'Convocadas' | 'Realizadas'>('Todas');

  const publishedAssembleias = assembleias.filter((a) => a.status === 'Publicado');

  const filtered = publishedAssembleias.filter((a) => {
    if (filterState === 'Convocadas') return a.estadoAssembleia === 'Convocada' || a.estadoAssembleia === 'Em andamento';
    if (filterState === 'Realizadas') return a.estadoAssembleia === 'Realizada';
    return true;
  });

  const handleDownloadAta = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    alert(`Iniciando download simulado de: ${fileName}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/80 text-amber-300 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5" />
          <span>Soberania e Deliberação Discente</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Assembleias Gerais & Histórico de Atas
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
          A assembleia é a instância máxima de decisão dos estudantes de Ciências Sociais da UFBA. Veja as convocações abertas, pautas e documentos deliberados.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        {(['Todas', 'Convocadas', 'Realizadas'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterState(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterState === tab
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {tab === 'Todas'
              ? `Todas as Assembleias (${publishedAssembleias.length})`
              : tab === 'Convocadas'
              ? `Convocadas / Urgentes (${publishedAssembleias.filter((a) => a.estadoAssembleia === 'Convocada').length})`
              : `Realizadas com Ata (${publishedAssembleias.filter((a) => a.estadoAssembleia === 'Realizada').length})`}
          </button>
        ))}
      </div>

      {/* Assemblies List */}
      <div className="space-y-6">
        {filtered.map((assembleia) => {
          const isConvocada = assembleia.estadoAssembleia === 'Convocada';

          return (
            <div
              key={assembleia.id}
              onClick={() => onSelectAssembleia(assembleia)}
              className={`p-6 sm:p-8 rounded-2xl border transition-all cursor-pointer space-y-6 ${
                assembleia.urgente
                  ? 'bg-gradient-to-br from-red-950/40 via-neutral-900 to-neutral-950 border-red-700/80 hover:border-red-500 shadow-lg shadow-red-950/20'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <CategoryBadge categoria={assembleia.categoria} size="sm" />
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isConvocada
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {isConvocada ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {assembleia.estadoAssembleia}
                  </span>
                  {assembleia.urgente && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold">
                      <Flame className="w-3 h-3" />
                      URGENTE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium text-neutral-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {assembleia.data}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    {assembleia.horario}
                  </span>
                </div>
              </div>

              {/* Title and location */}
              <div className="space-y-2">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white hover:text-amber-300 transition-colors">
                  {assembleia.titulo}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{assembleia.local}</span>
                </p>
              </div>

              {/* Agenda Box */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                  Pontos de Pauta em Deliberação:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                  {assembleia.pauta.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attachments / Atas */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-neutral-800/80">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-neutral-400 font-medium">Documentos & Atas:</span>
                  {assembleia.atas.length > 0 ? (
                    assembleia.atas.map((ata) => (
                      <button
                        key={ata.id}
                        type="button"
                        onClick={(e) => handleDownloadAta(e, ata.titulo)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700 hover:border-neutral-600 transition-colors"
                      >
                        <FileDown className="w-3.5 h-3.5 text-amber-400" />
                        <span className="max-w-[200px] truncate">{ata.titulo}</span>
                        <span className="text-[10px] text-neutral-500">({ata.tamanho})</span>
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-neutral-400 italic">Nenhum anexo no momento</span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline">
                  <span>Abrir Detalhes da Assembleia</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
