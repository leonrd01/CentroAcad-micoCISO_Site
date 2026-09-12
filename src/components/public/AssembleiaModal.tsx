import React from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Flame,
  FileDown,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Assembleia } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface AssembleiaModalProps {
  assembleia: Assembleia | null;
  onClose: () => void;
}

export const AssembleiaModal: React.FC<AssembleiaModalProps> = ({ assembleia, onClose }) => {
  if (!assembleia) return null;

  const handleDownload = (fileName: string) => {
    // Simulated instant download feedback
    alert(`Iniciando download do documento oficial: ${fileName}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl text-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-900/95 border-b border-neutral-800 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à lista de assembleias</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Badges & Urgency */}
          <div className="flex flex-wrap items-center gap-2.5">
            <CategoryBadge categoria={assembleia.categoria} size="md" />
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                assembleia.estadoAssembleia === 'Convocada'
                  ? 'bg-amber-950/70 text-amber-300 border border-amber-700/60 animate-pulse'
                  : assembleia.estadoAssembleia === 'Em andamento'
                  ? 'bg-red-950/70 text-red-300 border border-red-700/60'
                  : 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/60'
              }`}
            >
              {assembleia.estadoAssembleia === 'Convocada' && <AlertCircle className="w-3.5 h-3.5" />}
              {assembleia.estadoAssembleia === 'Realizada' && <CheckCircle2 className="w-3.5 h-3.5" />}
              Assembleia {assembleia.estadoAssembleia}
            </span>
            {assembleia.urgente && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-sm">
                <Flame className="w-3 h-3" />
                CONVOCATÓRIA URGENTE
              </span>
            )}
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
            {assembleia.titulo}
          </h2>

          {/* Logistics card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <p className="text-neutral-400 font-medium">Data Convocada</p>
                <p className="font-semibold text-white">{assembleia.data}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-neutral-400 font-medium">Horário / Chamadas</p>
                <p className="font-semibold text-white">{assembleia.horario}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:col-span-1">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-neutral-400 font-medium">Local de Realização</p>
                <p className="font-semibold text-white line-clamp-1">{assembleia.local}</p>
              </div>
            </div>
          </div>

          {/* Full context description */}
          {assembleia.conteudoCompleto && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                Justificativa & Contexto Político
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                {assembleia.conteudoCompleto}
              </p>
            </div>
          )}

          {/* Agenda items (Pauta) */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Pauta Deliberativa em Ordem do Dia
            </h3>
            <div className="space-y-2">
              {assembleia.pauta.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-sm text-neutral-200"
                >
                  <span className="w-5 h-5 rounded-md bg-red-950 text-red-400 border border-red-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attached documents & Minutes (Atas) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-2">
              <FileDown className="w-4 h-4 text-amber-400" />
              Atas e Documentos Oficiais Anexos
            </h3>
            {assembleia.atas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assembleia.atas.map((ata) => (
                  <div
                    key={ata.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group"
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <p className="text-xs font-semibold text-neutral-200 group-hover:text-red-400 transition-colors truncate">
                        {ata.titulo}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {ata.dataPublicacao} • {ata.tamanho}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(ata.titulo)}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-red-600 hover:text-white text-neutral-300 transition-colors shrink-0"
                      title="Baixar Arquivo"
                    >
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                Nenhum documento anexado até o momento. A ata será disponibilizada após a redação final da mesa.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
