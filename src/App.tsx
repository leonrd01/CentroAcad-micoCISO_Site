/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_ASSEMBLEIAS,
  INITIAL_EVENTOS,
  INITIAL_NOTICIAS,
  INITIAL_PAUTAS,
  INITIAL_USERS,
} from './data/mockData';
import {
  AdminViewType,
  Assembleia,
  CategoriaThematica,
  ContentStatus,
  Evento,
  Noticia,
  Pauta,
  PautaStatus,
  PublicViewType,
  UserAdmin,
  UserRole,
} from './types';

// Public Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { HomeView } from './components/public/HomeView';
import { NoticiasView } from './components/public/NoticiasView';
import { EventosView } from './components/public/EventosView';
import { AssembleiasView } from './components/public/AssembleiasView';
import { PautasView } from './components/public/PautasView';
import { CategoriasView } from './components/public/CategoriasView';
import { NoticiaModal } from './components/public/NoticiaModal';
import { AssembleiaModal } from './components/public/AssembleiaModal';

// Admin Components
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminNoticiasCrud } from './components/admin/AdminNoticiasCrud';
import { AdminEventosCrud } from './components/admin/AdminEventosCrud';
import { AdminAssembleiasCrud } from './components/admin/AdminAssembleiasCrud';
import { AdminPautasCrud } from './components/admin/AdminPautasCrud';
import { AdminUsers } from './components/admin/AdminUsers';
import { ItemContentType, ItemFormModal } from './components/admin/ItemFormModal';
import { DeleteConfirmModal } from './components/admin/DeleteConfirmModal';

export default function App() {
  // 1. DATA STATE (Mock arrays fed into local useState as required)
  const [noticias, setNoticias] = useState<Noticia[]>(INITIAL_NOTICIAS);
  const [eventos, setEventos] = useState<Evento[]>(INITIAL_EVENTOS);
  const [assembleias, setAssembleias] = useState<Assembleia[]>(INITIAL_ASSEMBLEIAS);
  const [pautas, setPautas] = useState<Pauta[]>(INITIAL_PAUTAS);
  const [users, setUsers] = useState<UserAdmin[]>(INITIAL_USERS);

  // 2. AUTH & SESSION STATE
  // Starts with the primary admin loaded for seamless testing, but can log out and switch
  const [currentUser, setCurrentUser] = useState<UserAdmin | null>(INITIAL_USERS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // 3. NAVIGATION STATE
  const [appMode, setAppMode] = useState<'public' | 'admin'>('public');
  const [publicView, setPublicView] = useState<PublicViewType>('inicio');
  const [adminTab, setAdminTab] = useState<AdminViewType>('overview');

  // 4. MODALS & SELECTIONS
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [selectedAssembleia, setSelectedAssembleia] = useState<Assembleia | null>(null);
  const [selectedCategoryGlobal, setSelectedCategoryGlobal] = useState<CategoriaThematica>('Acadêmico');

  // Form Modal (Create / Edit)
  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    type: ItemContentType;
    data: any | null;
  }>({
    isOpen: false,
    type: 'noticia',
    data: null,
  });

  // Delete Confirm Modal
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: ItemContentType;
    id: string;
    title: string;
  }>({
    isOpen: false,
    type: 'noticia',
    id: '',
    title: '',
  });

  // URGENT ASSEMBLIES COUNTER
  const urgentAssemblyCount = assembleias.filter(
    (a) => a.urgente && a.estadoAssembleia === 'Convocada' && a.status === 'Publicado'
  ).length;

  // --- CRUD HANDLERS ---

  // Save Item (Create or Update)
  const handleSaveItem = (savedItem: any) => {
    const { type } = formModal;

    if (type === 'noticia') {
      setNoticias((prev) => {
        const exists = prev.some((i) => i.id === savedItem.id);
        return exists
          ? prev.map((i) => (i.id === savedItem.id ? savedItem : i))
          : [savedItem, ...prev];
      });
    } else if (type === 'evento') {
      setEventos((prev) => {
        const exists = prev.some((i) => i.id === savedItem.id);
        return exists
          ? prev.map((i) => (i.id === savedItem.id ? savedItem : i))
          : [savedItem, ...prev];
      });
    } else if (type === 'assembleia') {
      setAssembleias((prev) => {
        const exists = prev.some((i) => i.id === savedItem.id);
        return exists
          ? prev.map((i) => (i.id === savedItem.id ? savedItem : i))
          : [savedItem, ...prev];
      });
    } else if (type === 'pauta') {
      setPautas((prev) => {
        const exists = prev.some((i) => i.id === savedItem.id);
        return exists
          ? prev.map((i) => (i.id === savedItem.id ? savedItem : i))
          : [savedItem, ...prev];
      });
    }

    setFormModal({ isOpen: false, type: 'noticia', data: null });
  };

  // Delete Item
  const handleConfirmDelete = () => {
    const { type, id } = deleteModal;

    if (type === 'noticia') {
      setNoticias((prev) => prev.filter((i) => i.id !== id));
    } else if (type === 'evento') {
      setEventos((prev) => prev.filter((i) => i.id !== id));
    } else if (type === 'assembleia') {
      setAssembleias((prev) => prev.filter((i) => i.id !== id));
    } else if (type === 'pauta') {
      setPautas((prev) => prev.filter((i) => i.id !== id));
    }

    setDeleteModal({ isOpen: false, type: 'noticia', id: '', title: '' });
  };

  // Toggle Status (Publicado <-> Rascunho)
  const handleToggleStatus = (type: ItemContentType, id: string) => {
    if (type === 'noticia') {
      setNoticias((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === 'Publicado' ? 'Rascunho' : 'Publicado',
              }
            : item
        )
      );
    } else if (type === 'evento') {
      setEventos((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === 'Publicado' ? 'Rascunho' : 'Publicado',
              }
            : item
        )
      );
    } else if (type === 'assembleia') {
      setAssembleias((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === 'Publicado' ? 'Rascunho' : 'Publicado',
              }
            : item
        )
      );
    } else if (type === 'pauta') {
      setPautas((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                statusPublicacao:
                  item.statusPublicacao === 'Publicado' ? 'Rascunho' : 'Publicado',
              }
            : item
        )
      );
    }
  };

  // Update Kanban Status for Pauta
  const handleUpdateKanbanStatus = (id: string, newKanban: PautaStatus) => {
    setPautas((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              kanbanStatus: newKanban,
              dataAtualizacao: new Date().toLocaleDateString('pt-BR'),
            }
          : item
      )
    );
  };

  // User Management
  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, papel: newRole } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, papel: newRole } : null));
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : u
      )
    );
  };

  const handleAddUser = (newUser: UserAdmin) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  // Auth actions
  const handleLoginSuccess = (user: UserAdmin) => {
    setCurrentUser(user);
    setAppMode('admin');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppMode('public');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 1. PUBLIC MODE */}
      {appMode === 'public' && (
        <div className="flex-1 flex flex-col">
          <PublicNavbar
            currentView={publicView}
            onNavigate={(view) => {
              setPublicView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdminLogin={() => setIsLoginModalOpen(true)}
            onGoToAdminPanel={() => setAppMode('admin')}
            currentUser={currentUser}
            onLogout={handleLogout}
            urgentAssemblyCount={urgentAssemblyCount}
          />

          <main className="flex-1">
            {publicView === 'inicio' && (
              <HomeView
                noticias={noticias}
                eventos={eventos}
                assembleias={assembleias}
                pautas={pautas}
                onNavigate={(view) => {
                  setPublicView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectNoticia={(n) => setSelectedNoticia(n)}
                onSelectAssembleia={(a) => setSelectedAssembleia(a)}
                onSelectCategoria={(cat) => setSelectedCategoryGlobal(cat)}
              />
            )}

            {publicView === 'noticias' && (
              <NoticiasView
                noticias={noticias}
                onSelectNoticia={(n) => setSelectedNoticia(n)}
              />
            )}

            {publicView === 'eventos' && (
              <EventosView eventos={eventos} />
            )}

            {publicView === 'assembleias' && (
              <AssembleiasView
                assembleias={assembleias}
                onSelectAssembleia={(a) => setSelectedAssembleia(a)}
              />
            )}

            {publicView === 'pautas' && (
              <PautasView pautas={pautas} />
            )}

            {publicView === 'categorias' && (
              <CategoriasView
                selectedCategoria={selectedCategoryGlobal}
                onSelectCategoria={(cat) => setSelectedCategoryGlobal(cat)}
                noticias={noticias}
                eventos={eventos}
                assembleias={assembleias}
                pautas={pautas}
                onSelectNoticia={(n) => setSelectedNoticia(n)}
                onSelectAssembleia={(a) => setSelectedAssembleia(a)}
              />
            )}
          </main>

          <PublicFooter
            onNavigate={(view) => {
              setPublicView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdminLogin={() => setIsLoginModalOpen(true)}
          />
        </div>
      )}

      {/* 2. ADMIN MODE (PAINEL ADMINISTRATIVO) */}
      {appMode === 'admin' && (
        <AdminLayout
          currentTab={adminTab}
          onNavigateTab={(tab) => setAdminTab(tab)}
          onViewPublicSite={() => setAppMode('public')}
          currentUser={currentUser}
          onLogout={handleLogout}
          noticiasCount={noticias.length}
          eventosCount={eventos.length}
          assembleiasCount={assembleias.length}
          pautasCount={pautas.length}
          usersCount={users.length}
        >
          {adminTab === 'overview' && (
            <AdminOverview
              noticias={noticias}
              eventos={eventos}
              assembleias={assembleias}
              pautas={pautas}
              users={users}
              currentUser={currentUser}
              onNavigateTab={(tab) => setAdminTab(tab)}
              onOpenCreateNoticia={() =>
                setFormModal({ isOpen: true, type: 'noticia', data: null })
              }
              onOpenCreateEvento={() =>
                setFormModal({ isOpen: true, type: 'evento', data: null })
              }
              onOpenCreateAssembleia={() =>
                setFormModal({ isOpen: true, type: 'assembleia', data: null })
              }
              onOpenCreatePauta={() =>
                setFormModal({ isOpen: true, type: 'pauta', data: null })
              }
              onViewPublicSite={() => setAppMode('public')}
            />
          )}

          {adminTab === 'noticias' && (
            <AdminNoticiasCrud
              noticias={noticias}
              onOpenCreate={() =>
                setFormModal({ isOpen: true, type: 'noticia', data: null })
              }
              onOpenEdit={(item) =>
                setFormModal({ isOpen: true, type: 'noticia', data: item })
              }
              onOpenDelete={(id, title) =>
                setDeleteModal({ isOpen: true, type: 'noticia', id, title })
              }
              onToggleStatus={(id) => handleToggleStatus('noticia', id)}
            />
          )}

          {adminTab === 'eventos' && (
            <AdminEventosCrud
              eventos={eventos}
              onOpenCreate={() =>
                setFormModal({ isOpen: true, type: 'evento', data: null })
              }
              onOpenEdit={(item) =>
                setFormModal({ isOpen: true, type: 'evento', data: item })
              }
              onOpenDelete={(id, title) =>
                setDeleteModal({ isOpen: true, type: 'evento', id, title })
              }
              onToggleStatus={(id) => handleToggleStatus('evento', id)}
            />
          )}

          {adminTab === 'assembleias' && (
            <AdminAssembleiasCrud
              assembleias={assembleias}
              onOpenCreate={() =>
                setFormModal({ isOpen: true, type: 'assembleia', data: null })
              }
              onOpenEdit={(item) =>
                setFormModal({ isOpen: true, type: 'assembleia', data: item })
              }
              onOpenDelete={(id, title) =>
                setDeleteModal({ isOpen: true, type: 'assembleia', id, title })
              }
              onToggleStatus={(id) => handleToggleStatus('assembleia', id)}
            />
          )}

          {adminTab === 'pautas' && (
            <AdminPautasCrud
              pautas={pautas}
              onOpenCreate={() =>
                setFormModal({ isOpen: true, type: 'pauta', data: null })
              }
              onOpenEdit={(item) =>
                setFormModal({ isOpen: true, type: 'pauta', data: item })
              }
              onOpenDelete={(id, title) =>
                setDeleteModal({ isOpen: true, type: 'pauta', id, title })
              }
              onToggleStatus={(id) => handleToggleStatus('pauta', id)}
              onUpdateKanbanStatus={handleUpdateKanbanStatus}
            />
          )}

          {adminTab === 'usuarios' && (
            <AdminUsers
              users={users}
              currentUser={currentUser}
              onUpdateRole={handleUpdateUserRole}
              onToggleStatus={handleToggleUserStatus}
              onAddUser={handleAddUser}
            />
          )}
        </AdminLayout>
      )}

      {/* 3. GLOBAL MODALS */}
      {/* News Detailed Reading Modal */}
      <NoticiaModal
        noticia={selectedNoticia}
        onClose={() => setSelectedNoticia(null)}
      />

      {/* Assembly Details & Minutes Modal */}
      <AssembleiaModal
        assembleia={selectedAssembleia}
        onClose={() => setSelectedAssembleia(null)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        availableUsers={users}
      />

      {/* Dynamic Item Form Modal (CRUD) */}
      <ItemFormModal
        isOpen={formModal.isOpen}
        type={formModal.type}
        initialData={formModal.data}
        onClose={() => setFormModal({ isOpen: false, type: 'noticia', data: null })}
        onSave={handleSaveItem}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={`Excluir ${deleteModal.type}`}
        itemDescription={deleteModal.title}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, type: 'noticia', id: '', title: '' })
        }
      />
    </div>
  );
}
