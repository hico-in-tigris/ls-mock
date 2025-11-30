
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Home,
  Lightbulb,
  CheckSquare,
  Folder,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// 気づき・ログ関連のページ
const hypothesisPages = ['ThoughtEntry', 'HypothesisDetail', 'HypothesisList'];

// プロジェクト関連のページ
const projectPages = ['Projects'];

// PeopleOS関連のページ
const peoplePages = ['People', 'PersonDetail', 'PeopleSkills', 'PeopleInterests', 'PeopleRecommend', 'PeopleAdd'];

// メインナビゲーション
const mainNav = [
  { 
    name: 'ホーム', 
    href: 'Dashboard', 
    icon: Home,
    label: 'Dashboard'
  },
  { 
    name: '気づき・ログ', 
    href: 'ThoughtEntry', 
    icon: Lightbulb,
    label: 'Hypothesis Entry',
    subItems: [
      { name: '仮説生成（AI）', href: 'ThoughtEntry' }
    ]
  },
  { 
    name: '小さな検証', 
    href: 'Actions', 
    icon: CheckSquare,
    label: 'Actions'
  },
  { 
    name: 'プロジェクト化', 
    href: 'Projects', 
    icon: Folder,
    label: 'ProjectOS',
    subItems: [
      { name: 'プロジェクト一覧', href: 'Projects' },
      { name: '進行状況', href: 'Dashboard' }, // Dashboardに進行状況セクションがある想定
      { name: '公開・応援', href: 'Projects' } // 将来的に専用ページを作成する想定
    ]
  },
  { 
    name: '仲間・協力者', 
    href: 'People', 
    icon: Users,
    label: 'PeopleOS',
    subItems: [
      { name: '一覧', href: 'People' },
      { name: 'スキルで探す', href: 'PeopleSkills' },
      { name: '関心で探す', href: 'PeopleInterests' },
      { name: '推薦AI', href: 'PeopleRecommend' },
      { name: '追加する', href: 'PeopleAdd' }
    ]
  },
  { 
    name: 'ふりかえり', 
    href: 'Summary', 
    icon: FileText,
    label: 'Review'
  },
  { 
    name: '設定', 
    href: 'Settings', 
    icon: Settings,
    label: 'Settings'
  },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    hypothesis: hypothesisPages.includes(currentPageName),
    project: projectPages.includes(currentPageName),
    people: peoplePages.includes(currentPageName)
  });
  
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const isActive = (href, subItems) => {
    if (currentPageName === href) return true;
    if (subItems) {
      return subItems.some(item => {
        if (item.href === 'Dashboard' && currentPageName === 'Dashboard') return true;
        if (item.href === 'People' && (currentPageName === 'People' || currentPageName === 'PersonDetail')) return true;
        if (item.href === 'PeopleSkills' && currentPageName === 'PeopleSkills') return true;
        if (item.href === 'PeopleInterests' && currentPageName === 'PeopleInterests') return true;
        if (item.href === 'PeopleRecommend' && currentPageName === 'PeopleRecommend') return true;
        if (item.href === 'PeopleAdd' && currentPageName === 'PeopleAdd') return true;
        if (item.href === 'Projects' && projectPages.includes(currentPageName)) return true;
        return currentPageName === item.href;
      });
    }
    return false;
  };

  // すべてのページで統一されたレイアウトを使用
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="font-bold text-slate-900">LocalSuccess OS</span>
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
                <h1 className="font-bold text-slate-900">LocalSuccess OS</h1>
                <p className="text-xs text-slate-500">地域の力を可視化</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const itemIsActive = isActive(item.href, item.subItems);
              const sectionKey = item.href === 'ThoughtEntry' ? 'hypothesis' : 
                                item.href === 'Projects' ? 'project' : 
                                item.href === 'People' ? 'people' : null;
              const isOpen = sectionKey ? openSections[sectionKey] : false;
              
              if (item.subItems) {
                return (
                  <Collapsible
                    key={item.name}
                    open={isOpen}
                    onOpenChange={() => sectionKey && toggleSection(sectionKey)}
                  >
                    <CollapsibleTrigger
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        itemIsActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <div className="text-left">
                          <div>{item.name}</div>
                          <div className="text-xs opacity-70">{item.label}</div>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const subIsActive = 
                          (subItem.href === 'Dashboard' && currentPageName === 'Dashboard') ||
                          (subItem.href === 'People' && (currentPageName === 'People' || currentPageName === 'PersonDetail')) ||
                          (subItem.href === 'PeopleSkills' && currentPageName === 'PeopleSkills') ||
                          (subItem.href === 'PeopleInterests' && currentPageName === 'PeopleInterests') ||
                          (subItem.href === 'PeopleRecommend' && currentPageName === 'PeopleRecommend') ||
                          (subItem.href === 'PeopleAdd' && currentPageName === 'PeopleAdd') ||
                          (subItem.href === 'Projects' && projectPages.includes(currentPageName)) ||
                          currentPageName === subItem.href;
                        return (
                          <Link
                            key={subItem.name}
                            to={createPageUrl(subItem.href)}
                            onClick={() => setSidebarOpen(false)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                              subIsActive
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    itemIsActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div>{item.name}</div>
                    <div className="text-xs opacity-70">{item.label}</div>
                  </div>
                </Link>
              );
            })}
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
