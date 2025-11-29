
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Feather,
  Layers,
  Menu,
  X,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 仮説OSモードのページ
const thoughtPages = ['ThoughtEntry', 'HypothesisDetail', 'HypothesisList'];

// 従来のLocalSuccessナビゲーション
const localSuccessNav = [
  { name: 'ダッシュボード', href: 'Dashboard', icon: () => <span className="text-lg">📊</span> },
  { name: 'プロジェクト', href: 'Projects', icon: () => <span className="text-lg">📁</span> },
  { name: 'アクション', href: 'Actions', icon: () => <span className="text-lg">✅</span> },
  { name: 'ふりかえり', href: 'Summary', icon: () => <span className="text-lg">📝</span> },
  { name: '設定', href: 'Settings', icon: () => <span className="text-lg">⚙️</span> },
];

// 仮説OSナビゲーション
const thoughtNav = [
  { name: '想いを入力', href: 'ThoughtEntry', icon: Feather },
  { name: '仮説一覧', href: 'HypothesisList', icon: Layers },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const isThoughtMode = thoughtPages.includes(currentPageName);

  // すべてのページで統一されたレイアウトを使用
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="font-bold text-slate-900">LocalSuccess</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h1 className="font-bold text-slate-900">LocalSuccess</h1>
                <p className="text-xs text-slate-500">地域の力を可視化</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {localSuccessNav.map((item) => {
              const isActive = currentPageName === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
              <p className="px-4 text-xs text-slate-400 mb-2">OS機能</p>
              
              {/* PeopleOS */}
              <Link
                to={createPageUrl('People')}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  (currentPageName === 'People' || currentPageName === 'PersonDetail')
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Users className="w-5 h-5 text-emerald-500" />
                PeopleOS
              </Link>
              
              {/* 仮説OS */}
              <Link
                to={createPageUrl('ThoughtEntry')}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  thoughtPages.includes(currentPageName)
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Feather className="w-5 h-5 text-blue-500" />
                仮説OS
              </Link>
            </div>

            {/* 仮説OS内のナビゲーション（仮説OSページ内でのみ表示） */}
            {isThoughtMode && (
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
                <p className="px-4 text-xs text-slate-400 mb-2">仮説OS</p>
                {thoughtNav.map((item) => {
                  const isActive = currentPageName === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={createPageUrl(item.href)}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive 
                          ? "bg-blue-50 text-blue-700" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-slate-100">
            <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100">
              <p className="text-xs text-slate-500">
                地域の小さな行動を、<br />大きな変化に。
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "lg:ml-64 min-h-screen",
        "pt-16 lg:pt-0"
      )}>
        {children}
      </main>
    </div>
  );
}
