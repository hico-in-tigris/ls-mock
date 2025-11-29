import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Users, MessageCircle, Activity } from "lucide-react";
import CommentThread from './CommentThread';
import ActivityFeed from './ActivityFeed';
import ShareDialog from './ShareDialog';

export default function CollaborationPanel({ hypothesisId, hypothesisTitle }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">コラボレーション</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 py-4 border-b border-slate-100">
          <SheetTitle className="flex items-center justify-between">
            <span>コラボレーション</span>
            <ShareDialog 
              hypothesisId={hypothesisId} 
              hypothesisTitle={hypothesisTitle}
              trigger={
                <Button size="sm" className="bg-slate-800 hover:bg-slate-900">
                  <Users className="w-4 h-4 mr-1.5" />
                  招待
                </Button>
              }
            />
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="comments" className="h-full">
          <TabsList className="w-full justify-start px-6 py-2 bg-slate-50 rounded-none border-b">
            <TabsTrigger value="comments" className="gap-1.5">
              <MessageCircle className="w-4 h-4" />
              コメント
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-1.5">
              <Activity className="w-4 h-4" />
              履歴
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="p-6 mt-0">
            <CommentThread hypothesisId={hypothesisId} />
          </TabsContent>

          <TabsContent value="activity" className="p-0 mt-0">
            <ActivityFeed hypothesisId={hypothesisId} maxHeight={500} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}