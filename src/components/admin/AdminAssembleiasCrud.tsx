import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Flame,
  FileDown,
  AlertCircle,
  Filter
} from 'lucide-react';
import { Assembleia, ContentStatus } from '../../types';
import { CategoryBadge } from '../ui/CategoryBadge';

interface AdminAssembleiasCrudProps {
  assembleias: Assembleia[];
  onOpenCreate: () => void;
  onOpenEdit: (assembleia: Assembleia) => void;
  onOpenDelete: (id: string, title: string) => void;
  onToggleStatus: (id: string) => void;
}

export const AdminAssembleiasCrud: React.FC<AdminAssembleiasCrudProps> = ({
  assembleias,
  onOpenCreate,
  onOpenEdit,
  onOpenDelete,
  onToggleStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | ContentStatus>('Todos');

  const filtered = assembleias.filter((item) => {
    const matchesSearch =
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pauta.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500" />
            <span>Gerenciar Assembleias & Atas</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Convoque assembleias gerais, gerencie editais de urgência e cadastre as atas deliberadas.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Convocatória</span>
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
            placeholder="Buscar assembleia por tema da pauta ou local..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
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
                <th className="py-3.5 px-4">Assembleia & Pontos de Pauta</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4">Data & Horário</th>
                <th className="py-3.5 px-4">Atas Anexas</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white truncate text-xs sm:text-sm">
                        {item.titulo}
                      </p>
                      {item.urgente && (
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold shrink-0">
                          URGENTE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {item.pauta.length} pontos: {item.pauta[0]}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.estadoAssembleia === 'Convocada'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {item.estadoAssembleia}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-neutral-300">
                    <p className="font-medium text-white">{item.data}</p>
                    <p className="text-[11px] text-neutral-400">{item.horario}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-300">
                      <FileDown className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.atas.length} {item.atas.length === 1 ? 'arquivo' : 'arquivos'}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(item.id)}
                      title="Clique para alternar status"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
                        item.status === 'Publicado'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'Publicado' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span>{item.status}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(item)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                        title="Editar assembleia"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDelete(item.id, item.titulo)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-neutral-400"
                        title="Excluir assembleia"
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
                    Nenhuma assembleia encontrada.
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
