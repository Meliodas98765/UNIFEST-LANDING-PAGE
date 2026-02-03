# Unicorn Store - Multi-Store Pre-Booking Application

A React + TypeScript + Vite application for managing pre-bookings across multiple Unicorn Store locations. The application uses a centralized configuration system to display store-specific information dynamically.

## Multi-Store Configuration

This application supports multiple store locations, each with their own:
- Store name and address
- Contact information (email and phone)
- Store-specific disclaimer text
- Page title

### Store Configuration

Store configurations are managed in `src/config/stores.config.ts`. To add or modify a store:

1. Open `src/config/stores.config.ts`
2. Add or update the store configuration object with the following structure:
   ```typescript
   storeId: {
     id: 'storeId',
     name: 'Store Name',
     address: {
       line1: 'Address Line 1',
       line2: 'Address Line 2 (optional)',
       line3: 'Address Line 3 (optional)',
       city: 'City',
       state: 'State',
       pincode: '123456',
     },
     contact: {
       email: 'email@example.com',
       phone: '+91 98765 43210',
     },
     disclaimer: 'Store-specific disclaimer text',
     pageTitle: 'Page Title',
   }
   ```

### Building for Different Stores

The application uses the `VITE_STORE_ID` environment variable to determine which store configuration to use.

#### Option 1: Using Build Scripts (Recommended)

Pre-configured build scripts are available for each store:

```bash
# Build for Store 1
npm run build:store1

# Build for Store 2
npm run build:store2

# Build for Store 3
npm run build:store3

# Build for Store 4
npm run build:store4

# Build for Store 5
npm run build:store5
```

Each script will generate a `dist` folder with the store-specific build.

#### Option 2: Manual Build with Environment Variable

You can also build manually by setting the environment variable:

**On Windows (PowerShell):**
```powershell
$env:VITE_STORE_ID="store1"; npm run build
```

**On Windows (Command Prompt):**
```cmd
set VITE_STORE_ID=store1 && npm run build
```

**On Linux/Mac:**
```bash
VITE_STORE_ID=store1 npm run build
```

### Development

To run the development server with a specific store:

**On Windows (PowerShell):**
```powershell
$env:VITE_STORE_ID="store1"; npm run dev
```

**On Linux/Mac:**
```bash
VITE_STORE_ID=store1 npm run dev
```

If `VITE_STORE_ID` is not set, the application will default to `store1`.

### Deployment

1. Build the application for the desired store using one of the methods above
2. Deploy the generated `dist` folder to your hosting service
3. Each store can be hosted on a different URL

## Development Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
