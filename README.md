# 🍸 Cocktail Quiz

A fun and interactive cocktail quiz web application built with React,
TypeScript, Vite, and Tailwind CSS.

## Features

-   **Interactive Quiz Interface**: Clean and modern UI with multiple choice
    questions
-   **Progress Tracking**: Visual progress bar showing completion status
-   **Instant Feedback**: Explanations provided after each question
-   **Scoring System**: Comprehensive results with percentage scores and
    rankings
-   **Responsive Design**: Works perfectly on desktop and mobile devices
-   **10 Cocktail Questions**: Covers spirits, recipes, techniques, and cocktail
    knowledge

## Technologies Used

-   **React 18** - Modern React with hooks
-   **TypeScript** - Type-safe development
-   **Vite** - Fast build tool and development server
-   **Tailwind CSS** - Utility-first CSS framework
-   **Modern ES6+** - Latest JavaScript features

## Getting Started

### Prerequisites

-   Node.js (version 16 or higher)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd cocktail-quiz
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── QuestionCard.tsx    # Individual question display
│   ├── ProgressBar.tsx     # Progress tracking
│   ├── ResultsScreen.tsx   # Final results display
│   └── StartScreen.tsx     # Welcome screen
├── data/
│   └── questions.ts     # Quiz questions and answers
├── types/
│   └── quiz.ts          # TypeScript interfaces
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Tailwind CSS imports
```

## Quiz Features

-   **10 Questions** covering various cocktail topics
-   **Multiple Choice** format with 4 options each
-   **Immediate Feedback** with explanations
-   **Progressive Scoring** with visual feedback
-   **Performance Rankings** based on percentage scores
-   **Restart Functionality** to retake the quiz

## Scoring System

-   90-100%: Outstanding! You're a cocktail master! 🏆
-   80-89%: Excellent work! You know your cocktails! 🥇
-   70-79%: Great job! You're well on your way! 🥈
-   60-69%: Good effort! Keep learning! 🥉
-   Below 60%: Don't worry, practice makes perfect! 📚

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
