import React from 'react';
import { X, Calendar, User, Clock, Share2, ArrowLeft } from 'lucide-react';
import { Noticia } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface NoticiaModalProps {
  noticia: Noticia | null;
  onClose: () => void;
}

export const NoticiaModal: React.FC<NoticiaModalProps> = ({ noticia, onClose }) => {
  if (!noticia) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('Link da publicação copiado para a área de transferência!');
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
        {/* Top bar with close */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-900/95 border-b border-neutral-800 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar às publicações</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge categoria={noticia.categoria} size="md" />
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {noticia.data}
            </span>
            {noticia.tempoLeitura && (
              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {noticia.tempoLeitura}
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
            {noticia.titulo}
          </h1>

          <div className="flex items-center gap-3 py-3 border-y border-neutral-800/80 text-xs text-neutral-400">
            <div className="w-7 h-7 rounded-full bg-red-900/50 border border-red-700/50 flex items-center justify-center text-red-300 font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-medium text-neutral-300">{noticia.autor}</p>
              <p className="text-[11px] text-neutral-400">Publicado no Portal Oficial do CACISO UFBA</p>
            </div>
          </div>

          {noticia.imagemUrl && (
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 max-h-80">
              <img
                src={noticia.imagemUrl}
                alt={noticia.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 text-sm text-neutral-300 italic">
            "{noticia.resumo}"
          </div>

          <div className="text-neutral-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
            {noticia.conteudo}
          </div>

          {/* Footer of modal */}
          <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-400">
              Gestão CACISO • Voz Ativa e Combate Estudantil
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
            >
              Fechar Leitura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
