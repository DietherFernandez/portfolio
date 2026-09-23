# Implementation Plan: Premium Command Palette for Diether OS

## Overview
Transform the basic `CommandPalette.tsx` into a high-end, global system utility with centralized state, keyboard navigation, action commands, and a polished "OS" aesthetic.

## Architecture Changes

### 1. Global State Management
- Create `src/components/CommandPaletteProvider.tsx`.
- Use a React Context to manage `isOpen` state and the `toggleCommandPalette` function.
- Wrap the application in `layout.tsx` with this provider.

### 2. Component Refactoring (`CommandPalette.tsx`)
- Remove local `isOpen` state and use `useCommandPalette()` hook.
- Implement a categorized command structure:
  - `NavigationCommand`: Routes to a specific page.
  - `ActionCommand`: Executes a function (e.g., theme switch, system reset).
- Add keyboard navigation:
  - Use a `selectedIndex` state to track the active item.
  - Handle `ArrowUp`, `ArrowDown`, and `Enter`.
- Enhance UI with `backdrop-blur`, `os-card` styling, and better typography.

### 3. Integration & Accessibility
- Move the keyboard listener (`Ctrl+K` / `Cmd+K` and `Esc`) from the component to a dedicated listener in `layout.tsx` or a hook within the Provider.
- Ensure `autoFocus` on the search input when the palette opens.
- Focus trap/management to ensure accessibility.

## Detailed Command List

| Category | Command | Subtitle | Type | Action |
| :--- | :--- | :--- | :--- | :--- |
| **Navigation** | Overview | Go to home screen | Nav | `/` |
| **Navigation** | Projects | View project portfolio | Nav | `/projects` |
| **Navigation** | Lab | Explore experiments | Nav | `/lab` |
| **Navigation** | About | Learn more about me | Nav | `/about` |
| **Navigation** | Contact | Get in touch | Nav | `/contact` |
| **System** | Light Mode | Switch to light theme | Action | `setTheme('light')` |
| **System** | Dark Mode | Switch to dark theme | Action | `setTheme('dark')` |
| **System** | System Theme | Follow OS preferences | Action | `setTheme('system')` |
| **System** | Shortcuts | Show keyboard shortcuts | Action | `setShowShortcuts(true)` |

## Implementation Steps

### Step 1: The Provider
- Define `CommandPaletteContext` with `isOpen` and `toggle()`.
- Implement `CommandPaletteProvider` and export `useCommandPalette`.

### Step 2: The UI Overhaul
- Implement the new `CommandPalette.tsx` structure.
- Create a `CommandItem` sub-component for consistent styling.
- Integrate `lucide-react` icons for different command types.
- Apply Tailwind classes: `bg-surface/80`, `backdrop-blur-md`, `border-border`, `shadow-2xl`, `rounded-os`.

### Step 3: Keyboard & Logic
- Implement `useEffect` for keyboard navigation within the palette.
- Implement the filtering logic to search across both names and subtitles.
- Connect the Action commands to `useTheme` and other global states.

### Step 4: Layout Integration
- Wrap `RootLayout` children with `CommandPaletteProvider`.
- Move the `Ctrl+K` listener to `layout.tsx` using the provider's `toggle` method.

## Premium Visuals Reference
- **Input**: Mono font, border-bottom only or subtle inset, focus ring using accent color.
- **List**: Group headers in uppercase, muted text, smaller font size.
- **Items**: Subtle hover background `bg-accent/10`, active state `bg-accent/20` with a left-border indicator.
- **Animation**: `animate-in fade-in zoom-in-95 duration-200`.

## Critical Files
- `src/components/CommandPaletteProvider.tsx` (New)
- `src/components/CommandPalette.tsx` (Revised)
- `src/app/layout.tsx` (Integration)
- `src/components/ThemeProvider.tsx` (For Action commands)
