# Website Content Management

This folder contains all the content for your website in an easy-to-edit format.

## 📝 How to Modify Content

### 1. **Edit `siteContent.ts`**
All website content is now centralized in `src/data/siteContent.ts`. You can easily modify:

- **About section**: Education, description, skills, contact message
- **Projects**: Add, remove, or modify case studies
- **Social links**: Update LinkedIn, GitHub, resume links
- **Navigation**: Change section names

### 2. **Add a New Project**
Simply add a new object to the `projects` array:

```typescript
{
  id: 'your-project-id',
  title: 'Your Project Title',
  description: 'Brief description of your project',
  logo: '/your-logo.svg',
  image: '/your-project-image.png', // or null for no image
  links: [
    { label: 'GitHub', url: 'https://github.com/...' },
    { label: 'Live Demo', url: 'https://...' }
  ],
  details: {
    overview: 'Detailed project overview...',
    technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
    features: ['Feature 1', 'Feature 2'],
    challenges: ['Challenge 1', 'Challenge 2'],
    solutions: ['Solution 1', 'Solution 2']
  }
}
```

### 3. **Update About Section**
Modify the `about` object:

```typescript
about: {
  education: "Your education here",
  description: "Your description here",
  skills: "Your skills here",
  contactMessage: "Your contact message"
}
```

### 4. **Add Social Links**
Add new social links to the `social` array:

```typescript
{
  id: 'twitter',
  label: 'TWITTER',
  url: 'https://twitter.com/yourusername',
  icon: '→'
}
```

### 5. **Add Images**
- Place new images in the `public/` folder
- Reference them in your content as `/filename.ext`

## 🎯 Benefits

✅ **No code changes needed** - Just edit the data file  
✅ **Type safety** - TypeScript ensures correct data structure  
✅ **Centralized content** - All content in one place  
✅ **Easy to maintain** - Clear structure and organization  
✅ **Automatic updates** - Changes appear immediately on the website  

## 📁 File Structure

```
src/data/
├── siteContent.ts      # Main content file
├── siteContent.d.ts    # TypeScript definitions
└── README.md          # This file
```

## 🚀 Quick Start

1. Open `src/data/siteContent.ts`
2. Find the section you want to modify
3. Make your changes
4. Save the file
5. The website will automatically update!

No need to restart the server or modify any React components! 