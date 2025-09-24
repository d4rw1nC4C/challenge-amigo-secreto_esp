# Amigo Secreto - Sorteo de Amigos

## Project Overview

This is a "Amigo Secreto" (Secret Friend) web application built with vanilla HTML, CSS, and JavaScript. It's an educational challenge project from Alura that allows users to add friends to a list and randomly select one as the "secret friend".

## Features

### Core Functionality
- **Friend Management**: Add, edit, and remove friends from the list
- **Smart Validation**: Prevents empty names, duplicates, and normalizes input
- **Random Selection**: Uses Fisher-Yates algorithm for fair random selection
- **Interactive UI**: Real-time feedback and loading indicators

### Advanced Features
- **Inline Editing**: Click to edit friend names directly in the list
- **Keyboard Navigation**: Full keyboard support with shortcuts
- **Accessibility**: ARIA labels, screen reader announcements, and focus management
- **Input Validation**: Real-time validation with visual feedback
- **Confirmation Dialogs**: Secure deletion and clearing operations

## Architecture

- **Frontend Only**: Pure client-side application with no backend dependencies
- **Single Page Application**: All functionality contained in `index.html` with modular JavaScript
- **Responsive Design**: CSS uses flexbox layout with mobile-first approach

### File Structure

```
├── index.html          # Main HTML structure with semantic markup
├── app.js             # Core JavaScript functionality (629 lines)
├── style.css          # Complete styling with CSS custom properties
├── assets/            # Static images (logo and icons)
├── docs/              # Project documentation in Spanish
│   └── AmigoSecreto.md
└── .gitignore         # Git ignore configuration
```

### Key Components

- **Friend Management**: Add, validate, edit, and remove friends
- **Fisher-Yates Shuffle**: Mathematically fair random selection algorithm
- **Input Validation**: Real-time validation with duplicate detection
- **Accessibility Features**: Screen reader support and keyboard navigation
- **DOM Manipulation**: Direct DOM updates with error handling

## User Interface

### Keyboard Shortcuts
- `Enter` - Add friend or confirm edit
- `Escape` - Clear input or cancel edit
- `Ctrl+Enter` - Execute random draw (if 2+ friends)
- `Ctrl+L` - Clear entire list (with confirmation)

### Interactive Elements
- **Edit Mode**: Click pencil icon to edit names inline
- **Delete Function**: Click trash icon to remove friends
- **Visual Feedback**: Input validation states and hover effects
- **Loading Indicator**: Shows during random selection process

## Development

### Running the Application

```bash
# Open directly in browser (no build process required)
open index.html

# OR serve with any static server
python -m http.server 8000
npx serve .
```

### Testing

Manual testing checklist:
1. **Input Validation**: Empty names, duplicates, special characters
2. **Edit Functionality**: Inline editing, cancel/save operations
3. **Delete Operations**: Individual deletion, bulk clearing
4. **Random Selection**: Multiple draws, minimum friend requirements
5. **Keyboard Navigation**: All shortcuts and accessibility features
6. **Responsive Design**: Mobile and desktop layouts

### Code Quality

- **Spanish Language**: All user-facing text, comments, and variable names in Spanish
- **Semantic HTML**: Proper use of ARIA labels and roles for accessibility
- **CSS Variables**: Consistent color scheme using CSS custom properties
- **Error Handling**: Comprehensive validation and user-friendly alerts
- **DOM Safety**: Helper function `byId()` with error checking for missing elements
- **Algorithm Implementation**: Fisher-Yates shuffle for unbiased randomization

### Core Functions

#### Friend Management
- `agregarAmigo()` - Adds friend with validation and normalization
- `eliminarAmigo(indice)` - Removes friend by index
- `iniciarEdicion(indice)` - Starts inline editing mode
- `guardarEdicion(indice)` - Saves edited name with validation
- `cancelarEdicion(indice)` - Cancels edit operation

#### UI Updates
- `actualizarLista()` - Updates DOM list display with edit/delete buttons
- `actualizarEstadoBotones()` - Manages button enabled/disabled states
- `actualizarContadorAmigos()` - Updates friend counter display
- `actualizarMensajesAyuda()` - Shows contextual help messages

#### Utilities
- `normalizarNombre(nombre)` - Capitalizes and trims names
- `fisherYatesShuffle(array)` - Implements Fisher-Yates algorithm
- `anunciarCambio(mensaje)` - Announces changes to screen readers
- `validarEstadoInput()` - Real-time input validation with visual feedback

## Accessibility

- **Screen Reader Support**: Live announcements for all actions
- **Keyboard Navigation**: Full functionality without mouse
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Focus Management**: Proper focus handling during edit operations
- **Error States**: Visual and auditory feedback for validation errors