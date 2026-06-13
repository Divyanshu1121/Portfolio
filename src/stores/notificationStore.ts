import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  duration?: number; // ms
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

let notifCounter = 0;

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = `notif-${++notifCounter}-${Date.now()}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
      duration: notification.duration ?? 5000,
    };
    set((s) => ({
      notifications: [...s.notifications, newNotification].slice(-5), // max 5 visible
    }));

    // Auto-dismiss
    setTimeout(() => {
      set((s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      }));
    }, newNotification.duration);
  },

  removeNotification: (id) => {
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAll: () => set({ notifications: [] }),
}));
