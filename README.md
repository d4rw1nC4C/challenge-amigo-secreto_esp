# README.md

## Project Overview

This is a "Amigo Secreto" (Secret Friend) web application built with vanilla HTML, CSS, and JavaScript. It's an educational challenge project from Alura that allows users to add friends to a list and randomly select one as the "secret friend".

## Architecture

- **Frontend Only**: Pure client-side application with no backend dependencies
- **Single Page Application**: All functionality contained in `index.html` with modular JavaScript
- **Responsive Design**: CSS uses flexbox layout with mobile-first approach

### File Structure

- `index.html` - Main HTML structure with semantic markup
- `app.js` - Core JavaScript functionality for friend management and random selection
- `style.css` - Complete styling with CSS custom properties (variables)
- `assets/` - Static images (logo and icons)
- `docs/` - Project documentation in Spanish

### Key Components

- **Friend Management**: Add, validate, and display friends in a list
- **Random Selection**: Mathematical random selection from the friends array
- **Input Validation**: Prevents empty names and duplicates
- **DOM Manipulation**: Direct DOM updates without frameworks

## Development

### Running the Application

```bash
# Open directly in browser (no build process required)
open index.html
# OR serve with any static server
python -m http.server 8000
```

### Testing

No automated test framework is configured. Test manually by:
1. Adding valid/invalid friend names
2. Testing duplicate name validation
3. Verifying random selection functionality
4. Testing keyboard Enter key support

### Code Style

- **Spanish Language**: All user-facing text, comments, and variable names in Spanish
- **Semantic HTML**: Proper use of ARIA labels and roles for accessibility
- **CSS Variables**: Consistent color scheme using CSS custom properties
- **Error Handling**: User-friendly alerts for validation errors
- **DOM Safety**: Helper function `byId()` with error checking for missing elements

### Key Functions

- `agregarAmigo()` - Adds friend with validation (called from button and Enter key)
- `sortearAmigo()` - Randomly selects and displays secret friend
- `actualizarLista()` - Updates DOM list display
- `limpiarLista()` - Utility function to reset application state