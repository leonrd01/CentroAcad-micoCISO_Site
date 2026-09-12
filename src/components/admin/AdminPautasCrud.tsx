import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  Clock,
  Filter
} from 'lucide-react';
import { ContentStatus, Pauta, PautaStatus } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface AdminPautasCrudProps {
  pautas: Pauta[];
  onOpenCreate: () => void;
  onOpenEdit: (pauta: Pauta) => void;
  onOpenDelete: (id: string, title: string) => void;
  onToggleStatus: (id: string) => void;
  onUpdateKanbanStatus: (id: string, newKanban: PautaStatus) => void;
}

export const AdminPautasCrud: React.FC<AdminPautasCrudProps> = ({
  pautas,
  onOpenCreate,
  onOpenEdit,
  onOpenDelete,
  onToggleStatus,
  onUpdateKanbanStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | ContentStatus>('Todos');

  const filtered = pautas.filter((item) => {
    const matchesSearch =
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || item.statusPublicacao === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-500" />
            <span>Gerenciar Pautas & Reivindicações</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Atualize o status no quadro Kanban (Em discussão, Em acompanhamento, Concluído) e liste as conquistas.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Pauta</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar pauta por título ou reinvindicação..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Status:
          </span>
          {(['Todos', 'Publicado', 'Rascunho'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-neutral-100 text-neutral-950 border-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/80 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Pauta & Descrição</th>
                <th className="py-3.5 px-4">Etapa do Kanban</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">Prioridade</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-white truncate text-xs sm:text-sm">
                      {item.titulo}
                    </p>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                      {item.descricao}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={item.kanbanStatus}
                      onChange={(e) =>
                        onUpdateKanbanStatus(item.id, e.target.value as PautaStatus)
                      }
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold focus:outline-none ${
                        item.kanbanStatus === 'Em discussão'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : item.kanbanStatus === 'Em acompanhamento'
                          ? 'bg-sky-950/80 text-sky-300 border-sky-800'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      }`}
                    >
                      <option value="Em discussão">Em discussão</option>
                      <option value="Em acompanhamento">Em acompanhamento</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <CategoryBadge categoria={item.categoria} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.prioridade === 'Alta'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {item.prioridade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(item.id)}
                      title="Clique para alternar status"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
                        item.statusPublicacao === 'Publicado'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.statusPublicacao === 'Publicado' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span>{item.statusPublicacao}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(item)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                        title="Editar pauta"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDelete(item.id, item.titulo)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-neutral-400"
                        title="Excluir pauta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-neutral-500 italic">
                    Nenhuma pauta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
