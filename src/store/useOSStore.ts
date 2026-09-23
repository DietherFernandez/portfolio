import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isFocused: boolean;
  zIndex: number;
}

interface OSStore {
  openWindows: WindowState[];
  focusedWindowId: string | null;
  isTerminalOpen: boolean;
  systemBooted: boolean;
  terminalHistory: { type: 'input' | 'output'; content: string }[];

  // Actions
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleTerminal: () => void;
  setSystemBooted: (booted: boolean) => void;
  addToTerminalHistory: (type: 'input' | 'output', content: string) => void;
  clearTerminalHistory: () => void;
}

export const useOSStore = create<OSStore>((set) => ({
  openWindows: [],
  focusedWindowId: null,
  isTerminalOpen: false,
  systemBooted: false,
  terminalHistory: [],

  openWindow: (id, title) =>
    set((state) => {
      const existing = state.openWindows.find(w => w.id === id);
      if (existing) {
        return {
          focusedWindowId: id,
          openWindows: state.openWindows.map(w => ({
            ...w,
            isFocused: w.id === id,
            zIndex: w.id === id ? Math.max(...state.openWindows.map(win => win.zIndex), 0) + 1 : w.zIndex
          }))
        };
      }
      const newWindow: WindowState = {
        id,
        title,
        isOpen: true,
        isFocused: true,
        zIndex: state.openWindows.length > 0
          ? Math.max(...state.openWindows.map(w => w.zIndex)) + 1
          : 10,
      };
      return {
        openWindows: [...state.openWindows, newWindow],
        focusedWindowId: id,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.filter(w => w.id !== id),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    })),

  focusWindow: (id) =>
    set((state) => ({
      focusedWindowId: id,
      openWindows: state.openWindows.map(w => ({
        ...w,
        isFocused: w.id === id,
        zIndex: w.id === id ? Math.max(...state.openWindows.map(win => win.zIndex), 0) + 1 : w.zIndex
      }))
    })),

  toggleTerminal: () =>
    set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  setSystemBooted: (booted) =>
    set({ systemBooted: booted }),

  addToTerminalHistory: (type, content) =>
    set((state) => ({
      terminalHistory: [...state.terminalHistory, { type, content }]
    })),

  clearTerminalHistory: () =>
    set({ terminalHistory: [] }),
}));
