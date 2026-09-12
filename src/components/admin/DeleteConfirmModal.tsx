import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemDescription?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  itemDescription,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-white">
              Confirmar Exclusão
            </h3>
            <p className="text-xs text-neutral-300">
              Você tem certeza de que deseja remover permanentemente este conteúdo?
            </p>
          </div>
        </div>

        {itemDescription && (
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200 line-clamp-2">
            "{itemDescription}"
          </div>
        )}

        <p className="text-[11px] text-neutral-400">
          Esta ação apagará o item do protótipo e do banco de dados (quando integrado).
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shadow-red-950/50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Sim, Excluir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
