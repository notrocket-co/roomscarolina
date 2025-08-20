# Rooms Carolina - Room Rental Landing Page

A professional landing page for room rental applications, designed to build trust and encourage form submissions.

## Features

- 🎨 **Professional Design**: Clean, modern interface that builds credibility
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🔗 **Embedded Google Form**: Seamlessly integrated without looking like a typical Google Form
- ⚡ **Fast Loading**: Lightweight and optimized for quick load times
- 🎯 **Conversion Focused**: Designed to encourage form completions

## Setup for GitHub Pages

### Option 1: Quick Setup (Recommended)

1. **Create a new repository on GitHub**
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it something like `roomscarolina` or `room-rental-site`
   - Make sure it's **Public** (required for free GitHub Pages)
   - Don't initialize with README (we have our own files)

2. **Upload your files**
   - Upload `index.html`, `styles.css`, and `README.md` to the repository
   - You can drag and drop them directly on GitHub's web interface

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - It may take a few minutes to become available

### Option 2: Command Line Setup

If you prefer using the command line:

```bash
# Navigate to your project folder
cd /Users/millermcswain/Downloads/roomscarolina

# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - Room rental landing page"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/roomscarolina.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow steps 3-4 from Option 1 above.

## Customization

### Updating Content
- Edit `index.html` to change text, headings, or structure
- Modify `styles.css` to change colors, fonts, or layout

### Changing Colors
The site uses a purple gradient theme. To change colors, update these CSS variables in `styles.css`:
- Main gradient: `#667eea` to `#764ba2`
- Text colors: `#2d3748`, `#4a5568`, `#718096`

### Mobile Optimization
The site is already mobile-optimized with:
- Responsive design that works on all screen sizes
- Touch-friendly buttons and forms
- Optimized form height for mobile devices

## Form Integration

The Google Form is embedded using an iframe. The styling makes it look integrated with the site rather than like a standalone Google Form.

If you need to update the form:
1. Replace the iframe `src` URL in `index.html`
2. Adjust the iframe height if needed (current: 3539px for desktop, 2800px for mobile)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images and fonts
- Minimal JavaScript
- CSS animations for smooth interactions
- Fast loading times

## Support

This is a static HTML/CSS website that should work reliably across all modern browsers and devices. The design builds trust by looking professional while keeping the Google Form functionality intact.
