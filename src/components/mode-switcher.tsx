"use client";

import type { MarketMode } from '@/types';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bitcoin, LandPlot } from 'lucide-react'; // Using LandPlot for Forex as an abstract representation

interface ModeSwitcherProps {
  currentMode: MarketMode;
  onModeChange: (mode: MarketMode) => void;
}

export function ModeSwitcher({ currentMode, onModeChange }: ModeSwitcherProps) {
  return (
    <Tabs value={currentMode} onValueChange={(value) => onModeChange(value as MarketMode)} className="w-full sm:w-auto">
      <TabsList className="grid w-full grid-cols-2 sm:w-auto">
        <TabsTrigger value="crypto" className="flex items-center gap-2">
            <Bitcoin className="h-4 w-4" />
            Crypto
        </TabsTrigger>
        <TabsTrigger value="forex" className="flex items-center gap-2">
            <LandPlot className="h-4 w-4" />
            Forex
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
