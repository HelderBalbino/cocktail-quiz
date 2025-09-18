<div align="center">

# 🍸 Cocktail Quiz

**Test Your Mixology Knowledge with Style**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Maintainer](https://img.shields.io/badge/Maintainer-HelderBalbino-blue?style=for-the-badge)](https://github.com/HelderBalbino)

[🚀 Live Demo](#live-demo) • [📖 Documentation](#documentation) •
[🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

---

</div>

## 📋 Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Screenshots](#screenshots)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)
-   [Quiz System](#quiz-system)
-   [Development](#development)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)

## 🎯 Overview

**Cocktail Quiz** is a modern, interactive web application designed to test and
enhance your knowledge of professional cocktails, spirits, and bartending
techniques. Built with cutting-edge technologies and featuring a sophisticated
dark theme design, it offers an engaging mobile-first experience with timed
challenges and comprehensive feedback.

### Why This Project?

-   🎓 **Professional Education**: Learn 28 curated cocktail recipes from
    professional bartending
-   🎮 **Timed Challenges**: 30-second timer per question with visual countdown
-   📱 **Mobile-Optimized**: Dark theme design tailored specifically for mobile
    users
-   🏆 **Competitive**: Score tracking and performance rankings with instant
    feedback
-   🔄 **Always Fresh**: Randomized question order for unique experience each
    time
-   🚀 **Modern**: Built with latest web technologies and best practices

## ✨ Features

### Core Functionality

-   🧠 **28 Professional Questions** covering extensive cocktail knowledge
-   🎯 **Multiple Choice Format** with 4 options per question
-   ⏱️ **30-Second Timer** per question with automatic timeout handling
-   📊 **Real-time Progress Tracking** with visual indicators
-   💡 **Instant Explanations** after each answer (correct, incorrect, or
    timeout)
-   🏅 **Comprehensive Scoring System** with performance tiers
-   🔄 **Randomized Questions** for unique experience each time
-   🔄 **Quiz Restart Capability** for multiple attempts

### Professional Content

-   � **Signature Cocktails** including Ember Gimlet, Garden Collins, and Ruby
-   🥃 **Classic Cocktails** covering Mojito, Negroni, and Margarita
    fundamentals
-   🍾 **Sparkling Cocktails** featuring English Pear Bellini techniques
-   🧑‍🍳 **Bartending Techniques** including muddling, whip shaking, and mixing
    methods
-   📏 **Precise Measurements** and professional ratios
-   🎨 **Garnish Knowledge** including edible paints and presentation

### User Experience

-   🌙 **Dark Theme Design** with elegant slate and emerald color palette
-   📱 **Mobile-First Design** optimized for touch devices
-   ⚡ **Lightning Fast** powered by Vite with hot module replacement
-   🎭 **Interactive Feedback** with color-coded answers and timer urgency
-   🚀 **Smooth Transitions** between questions and screens
-   ⏰ **Visual Timer** with color-coded urgency states (green → yellow → red)

## 📸 Screenshots

> _Screenshots section - Add actual screenshots of your application here_

<details>
<summary>Click to view screenshots</summary>

|                 Start Screen                  |               Quiz Question                |           Results Screen            |
| :-------------------------------------------: | :----------------------------------------: | :---------------------------------: |
| ![Start Screen](docs/images/start-screen.png) | ![Quiz Question](docs/images/question.png) | ![Results](docs/images/results.png) |

</details>

## 🛠️ Tech Stack

### Frontend

-   **[React 18](https://reactjs.org/)** - Modern UI library with hooks
-   **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
-   **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
-   **[Vite](https://vitejs.dev/)** - Next-generation build tool

### Development Tools

-   **ESLint** - Code linting and quality
-   **PostCSS** - CSS processing
-   **Autoprefixer** - CSS vendor prefixing

### Browser Support

-   ✅ Chrome (latest)
-   ✅ Firefox (latest)
-   ✅ Safari (latest)
-   ✅ Edge (latest)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

-   **Node.js** (v16.0.0 or higher)
-   **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/HelderBalbino/cocktail-quiz.git
    cd cocktail-quiz
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. **Open your browser** Navigate to
   [http://localhost:5173](http://localhost:5173)

### Build Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 📁 Project Structure

```
cocktail-quiz/
├── 📁 public/              # Static assets
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── QuestionCard.tsx   # Individual question display with timer integration
│   │   ├── ProgressBar.tsx    # Progress tracking component
│   │   ├── ResultsScreen.tsx  # Final results display
│   │   ├── StartScreen.tsx    # Welcome/start screen with feature descriptions
│   │   └── Timer.tsx          # 30-second countdown timer with visual feedback
│   ├── 📁 data/
│   │   └── questions.ts       # 28 professional cocktail questions with randomization
│   ├── 📁 types/
│   │   └── quiz.ts           # TypeScript type definitions
│   ├── App.tsx               # Main application component with timer logic
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles (Tailwind + dark theme)
├── 📄 package.json           # Dependencies and scripts
├── 📄 vite.config.ts         # Vite configuration
├── 📄 tailwind.config.js     # Tailwind CSS configuration
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 vercel.json            # Vercel deployment configuration
└── 📄 README.md              # Project documentation
```

## 🎮 Quiz System

### Question Categories

Our carefully curated 28 professional questions cover:

-   🥃 **Signature Cocktails** - Ember Gimlet, Garden Collins, Ruby cocktail
    recipes
-   🍹 **Classic Cocktails** - Mojito, Negroni, Margarita fundamentals
-   🍾 **Sparkling Cocktails** - English Pear Bellini techniques and knowledge
-   🧑‍� **Bartending Techniques** - Muddling, whip shaking, stirring methods
-   📏 **Professional Measurements** - Precise ratios and serving specifications
-   🎨 **Garnish & Presentation** - Edible paints, glassware, and styling

### Timer System

-   ⏱️ **30-Second Timer** per question with visual countdown
-   � **Green Phase** (30-21s): Comfortable thinking time
-   🟡 **Yellow Phase** (20-11s): Moderate urgency
-   🔴 **Red Phase** (10-1s): High urgency warning
-   ⏰ **Auto-timeout** shows correct answer and explanation

### Scoring Tiers

| Score Range | Badge |                 Achievement                  |
| :---------: | :---: | :------------------------------------------: |
|   90-100%   |  🏆   | **Cocktail Master** - Outstanding knowledge! |
|   80-89%    |  🥇   |    **Mixology Expert** - Excellent work!     |
|   70-79%    |  🥈   |          **Bartender** - Great job!          |
|   60-69%    |  🥉   |        **Apprentice** - Good effort!         |
|  Below 60%  |  📚   |         **Student** - Keep learning!         |

### Interactive Features

-   **Progressive Feedback**: Instant visual feedback with color-coded answers
-   **Educational Explanations**: Learn from every question with detailed
    explanations
-   **Performance Tracking**: Monitor your progress with a dynamic progress bar
-   **Adaptive UI**: Dark theme responsive design optimized for mobile devices
-   **Randomized Questions**: Fisher-Yates shuffle ensures unique experience
    each time

## 🔧 Development

### Code Quality

This project maintains high code quality standards:

-   **TypeScript**: Full type safety and enhanced developer experience
-   **ESLint**: Consistent code style and error prevention
-   **Component Architecture**: Modular, reusable React components
-   **Responsive Design**: Mobile-first approach with Tailwind CSS

### Performance Features

-   ⚡ **Fast Loading**: Optimized with Vite for instant development
-   📦 **Tree Shaking**: Automatic unused code elimination
-   🗜️ **Asset Optimization**: Compressed images and minified CSS/JS
-   🔄 **Hot Module Replacement**: Instant updates during development

### Browser Compatibility

| Browser | Version Support      |
| ------- | -------------------- |
| Chrome  | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari  | ✅ Latest 2 versions |
| Edge    | ✅ Latest 2 versions |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**

    ```bash
    git fork https://github.com/HelderBalbino/cocktail-quiz.git
    ```

2. **Create a feature branch**

    ```bash
    git checkout -b feature/amazing-feature
    ```

3. **Make your changes**

    - Add new questions to `src/data/questions.ts`
    - Improve UI components
    - Fix bugs or add features

4. **Commit your changes**

    ```bash
    git commit -m "Add amazing feature"
    ```

5. **Push to your branch**

    ```bash
    git push origin feature/amazing-feature
    ```

6. **Open a Pull Request**

### Contribution Ideas

-   📝 Add more cocktail questions
-   🎨 Improve UI/UX design
-   🌐 Add internationalization
-   📱 Enhance mobile experience
-   🔊 Add sound effects
-   📊 Add statistics tracking

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE)
file for details.

```
MIT License

Copyright (c) 2025 Helder Balbino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🙏 Acknowledgments

-   **React Team** - For the amazing React library
-   **Vite Team** - For the lightning-fast build tool
-   **Tailwind CSS** - For the utility-first CSS framework
-   **TypeScript Team** - For type-safe JavaScript
-   **Cocktail Community** - For inspiration and knowledge sharing

---

<div align="center">

**Made with ❤️ and 🍸 by [Helder Balbino](https://github.com/HelderBalbino)**

⭐ **Star this repo if you found it helpful!** ⭐

[🔝 Back to Top](#-cocktail-quiz)

</div>
