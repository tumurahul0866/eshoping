import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
{['All', 'Veg', 'Non-Veg'].map((cat) => (
  <button
    key={cat}
    onClick={() => setFilter(cat)}
    className={`px-6 py-2 rounded-full font-medium transition-all ${
      filter === cat 
        ? 'bg-brand-gold text-brand-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
        : 'bg-slate-100 text-brand-black border border-slate-200 hover:border-brand-gold/50'
    }`}
  >
    {cat}
  </button>
))}