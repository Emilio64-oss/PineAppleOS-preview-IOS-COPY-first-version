import React from 'react';

export type SystemState = 'BOOT' | 'AOD' | 'LOCK' | 'HOME';
export type PanelState = 'NONE' | 'CONTROL' | 'NOTIFICATIONS';

export interface NotificationItem {
  id: string;
  app: string;
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
  urgent?: boolean;
}

export enum DynamicIslandState {
  IDLE = 'IDLE',
  MUSIC = 'MUSIC',
  CALL = 'CALL',
  UBER = 'UBER',
  LOADING = 'LOADING'
}