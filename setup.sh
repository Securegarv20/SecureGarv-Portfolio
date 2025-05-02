
#!/bin/bash

# Create main project directories
mkdir -p src/{components,pages,hooks,utils,lib,styles}
mkdir -p src/components/ui
mkdir -p public/images

# Create necessary files
touch src/pages/Index.tsx
touch src/pages/NotFound.tsx
touch src/components/MarqueeSkills.tsx
touch src/App.tsx
touch src/index.css
touch src/main.tsx
touch vite.config.ts
touch tailwind.config.ts
touch index.html

# Add initial content to files
echo "Initialized project structure successfully"

chmod +x setup.sh
