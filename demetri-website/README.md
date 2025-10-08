# Demetri Website - Refactored Structure

## 🎯 What Changed

The project has been refactored from a monolithic structure to a clean, modular architecture:

### Before
- ❌ 500+ line App.jsx
- ❌ Inline styles everywhere
- ❌ Magic numbers scattered
- ❌ No separation of concerns
- ❌ Hard to test and maintain

### After
- ✅ Modular component structure
- ✅ Centralized theme configuration
- ✅ Custom hooks for logic
- ✅ Constants extracted
- ✅ Environment variables for secrets
- ✅ Better accessibility

## 📁 New File Structure

```
src/
├── components/
│   ├── Hero.jsx                 # Hero section
│   ├── Navigation.jsx           # Navigation menu
│   ├── HomeContent.jsx          # Three-column home layout
│   ├── QuoteBlock.jsx           # Reusable quote component
│   ├── PodcastCarousel.jsx      # Podcast episode carousel
│   ├── ProjectList.jsx          # Projects list
│   ├── ContactList.jsx          # Contact information
│   ├── SectionLayout.jsx        # Shared section layout
│   └── PageHeader.jsx           # Section page header
│
├── sections/
│   ├── PodcastSection.jsx       # Podcast page
│   ├── BlogSection.jsx          # Blog page
│   ├── ProjectsSection.jsx      # Projects page
│   └── ConnectSection.jsx       # Connect page
│
├── hooks/
│   ├── useEpisodes.js           # Supabase episodes data
│   └── useCarousel.js           # Carousel logic & interactions
│
├── styles/
│   └── theme.js                 # Centralized design tokens
│
├── utils/
│   └── constants.js             # Constants & static data
│
├── App.jsx                      # Main app component
├── supabaseClient.js            # Supabase configuration
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@supabase/supabase-js` (newly added)
- All existing dependencies

### 2. Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**⚠️ IMPORTANT**: Never commit the `.env` file to Git! It's already in `.gitignore`.

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## 🔑 Key Improvements

### 1. **Security**
- ✅ API keys moved to environment variables
- ✅ No sensitive data in code

### 2. **Code Quality**
- ✅ Components are 50-150 lines (vs 500+)
- ✅ Single Responsibility Principle
- ✅ Reusable components
- ✅ Easy to test

### 3. **Maintainability**
- ✅ Clear file organization
- ✅ Centralized theme/constants
- ✅ Custom hooks for logic
- ✅ Consistent naming

### 4. **Accessibility**
- ✅ Keyboard navigation (arrow keys in carousel)
- ✅ ARIA labels on buttons
- ✅ Semantic HTML
- ✅ Screen reader support

### 5. **Performance**
- ✅ Component memoization (React.memo)
- ✅ useCallback for handlers
- ✅ Proper cleanup in useEffect

## 🎨 Theme Configuration

Edit `src/styles/theme.js` to change:
- Colors
- Typography
- Spacing
- Layout dimensions
- Transition speeds

Example:
```javascript
colors: {
  primary: '#537385',    // Change brand color
  text: '#7a7a7a',       // Change text color
  // ...
}
```

## 🔧 Customization

### Add a New Section

1. Create component in `src/sections/NewSection.jsx`
2. Add section data to `src/utils/constants.js`
3. Import and render in `src/App.jsx`

### Modify Carousel Behavior

Edit `src/hooks/useCarousel.js`:
```javascript
export const CAROUSEL_CONFIG = {
  ANIMATION_DURATION: 600,     // Flip speed
  AUTO_PLAY_INTERVAL: 5000,    // Auto-advance time
  DRAG_THRESHOLD: 50,          // Swipe sensitivity
};
```

### Add New Projects/Contacts

Edit `src/utils/constants.js`:
```javascript
export const PROJECTS = [
  { name: "NEW PROJECT", description: "...", url: "..." }
];
```

## 📝 Component Examples

### Using QuoteBlock
```jsx
import QuoteBlock from './components/QuoteBlock';

<QuoteBlock 
  text="Your quote here" 
  author="AUTHOR NAME" 
/>
```

### Using PageHeader
```jsx
import PageHeader from './components/PageHeader';

<PageHeader 
  subtitle="[SECTION]"
  description="Your description..."
/>
```

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure you created `.env` file
- Check that variables start with `VITE_`
- Restart dev server after adding .env

### Carousel not working
- Check browser console for errors
- Ensure episodes data has correct structure
- Verify Supabase connection

### Styles not applying
- Clear browser cache
- Check that theme.js is imported
- Verify inline style object structure

## 📚 Next Steps

Consider adding:
- [ ] CSS Modules for better style management
- [ ] TypeScript for type safety
- [ ] Unit tests with Vitest
- [ ] Responsive design (mobile breakpoints)
- [ ] SEO meta tags
- [ ] Loading skeletons
- [ ] Error boundaries

## 🤝 Contributing

When adding features:
1. Keep components under 150 lines
2. Extract constants to `constants.js`
3. Use theme variables for styling
4. Add PropTypes or TypeScript types
5. Test keyboard navigation
6. Check accessibility

## 📄 License

© 2025 Demetri. All rights reserved.