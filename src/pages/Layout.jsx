
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Feather,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 仮説OSモードのページ
const thoughtPages = ['ThoughtEntry', 'HypothesisDetail', 'HypothesisList'];

// 従来のLocalSuccessナビゲーション
const localSuccessNav = [
  { name: 'ダッシュボード', href: 'Dashboard', icon: () => <span className="text-lg">📊</span> },
  { name: 'プロジェクト', href: 'Projects', icon: () => <span className="text-lg">📁</span> },
  { name: '関係者', href: 'People', icon: () => <span className="text-lg">👥</span> },
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

  // 仮説OSモードの場合はシンプルなレイアウト
  if (isThoughtMode) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Simple Header for Thought Mode */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link 
              to={createPageUrl('ThoughtEntry')}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Feather className="w-4 h-4 text-slate-600" />
              </div>
              <span className="font-medium text-slate-900 hidden sm:inline">
                仮説OS
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {thoughtNav.map((item) => {
                const isActive = currentPageName === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-slate-100 text-slate-900" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <span className="hidden sm:inline">{item.name}</span>
                    <Icon className="w-4 h-4 sm:hidden" />
                  </Link>
                );
              })}
              
              <div className="w-px h-5 bg-slate-200 mx-2" />
              
              <Link
                to={createPageUrl('Dashboard')}
                className="px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              >
                <span className="hidden sm:inline">LocalSuccessへ</span>
                <span className="sm:hidden">📊</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-14">
          {children}
        </main>
      </div>
    );
  }

  // 従来のLocalSuccessレイアウト
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

            <div className="pt-4 mt-4 border-t border-slate-100">
              <p className="px-4 text-xs text-slate-400 mb-2">思考整理</p>
              <Link
                to={createPageUrl('ThoughtEntry')}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Feather className="w-5 h-5 text-slate-400" />
                仮説OS
              </Link>
            </div>
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
