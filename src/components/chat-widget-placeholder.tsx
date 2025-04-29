"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send } from 'lucide-react';

export function ChatWidgetPlaceholder() {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isOpen) {
    return (
      <Button
        variant="default" // Using primary blue color
        size="icon"
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open Chat"
      >
         {/* Red notification dot */}
         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-background" />
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] z-50 shadow-xl bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between p-3 bg-muted/50 rounded-t-lg">
        <div className="flex items-center gap-2">
          {/* Placeholder Icon */}
           <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <MessageSquare size={14}/>
           </div>
           <CardTitle className="text-sm font-semibold">Novax Trades</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close chat</span>
        </Button>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div className="text-sm p-2 rounded-md bg-secondary">
          Hello! Can I help you?
        </div>
        <div className="flex items-center space-x-2">
           <Input placeholder="Type a message here..." className="flex-1 h-9" />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-primary">
                <Send className="h-4 w-4" />
                 <span className="sr-only">Send message</span>
            </Button>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-2">
          Free live chat - <span className="font-semibold">Chaport</span> {/* Placeholder branding */}
        </div>
      </CardContent>
    </Card>
  );
}
