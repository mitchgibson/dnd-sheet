# D&D 2024 Character Sheet

A modern, interactive character sheet for Dungeons & Dragons 2024, built with Vue 3, TypeScript, and Tailwind CSS. This application features a local file-based storage system, allowing you to manage multiple characters with ease.

## Features

- **2024 Rulesset**: Updated for the latest D&D 2024 rules.
- **File-Based Storage**: Characters are saved as JSON files in the `app/characters` directory giving you full control over your data.
- **Auto-Save**: Changes are automatically saved after 1 second of inactivity.
- **Multiple Characters**: Create, load, and manage unlimited characters.
- **Smart Validation**: Prevents accidental overwrites and handles file renaming.
- **Clean UI**: Tabbed interface for easy navigation (Stats, Combat, Spells, Notes).
- **Interactive Elements**:
  - Clickable skills and saving throws to toggle proficiency/expertise.
  - Spell slot tracking.
  - Death save tracking.
  - Spell notes with counters.

## Project Setup

This project consists of a Vue 3 frontend and a lightweight Express backend for file operations.

```sh
npm install
```

### Run for Development

To start the application, simply run:

```sh
npm run dev
```

This command uses `concurrently` to start both:
1.  **Backend API**: Running on `http://localhost:3001` (Handles file I/O)
2.  **Frontend**: Running on `http://localhost:5173` (The UI)

### Building for Production

```sh
npm run build
```

## Data Storage

Character data is stored in the `characters/` directory at the project root.
-   **Format**: JSON
-   **Filename**: derived from the character name (e.g., `Gandalf_the_Grey.json`)

You can back up, share, or edit these files directly if needed.

## Tech Stack

-   **Framework**: Vue 3 (Script Setup)
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS + Custom CSS
-   **State Management**: Pinia
-   **Backend**: Node.js + Express
