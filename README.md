# Keyboard UI

A React + TypeScript keyboard UI component library inspired by this [Keyboard UI shot on Dribbble](https://dribbble.com/shots/25848307-Keyboard-UI).

This project is an opportunity to test **design-to-dev workflows** and experiment with **vibe coding** — translating a polished visual design into functional, interactive components with a focus on feel and fidelity.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for utility styles
- **CSS Modules** for component-scoped styling

## Features

- Realistic 3D keycap appearance using dynamic conic gradients
- Multiple color variants: cream, orange, charcoal, and custom
- Multiple sizes: 1u, 1.25u, 1.5u, 2u, 2u-v, 3u
- Press/release animations with proper easing
- Keyboard and pointer interaction support
- Grid-based layout system for composing keyboards

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Keycap/           # Individual keycap component
│   ├── KeyboardLayout/   # Grid layout container
│   └── icons/            # Icon components
└── hooks/
    └── useKeycapPress.ts # Pointer/keyboard interaction hook
```
