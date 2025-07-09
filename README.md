# Whisperers From The Far Shore

_A Tunic Language Learning Flashcard Game_

## About This Project

This project is a flashcard application for learning the fictional language from the indie game "Tunic". Users can practice phonemes, combined phonemes, and whole words using interactive SVG-based flashcards.

## 🎯 Project Features

- **Three Learning Modes**:
  - Simple Phonemes: Individual consonants and vowels
  - Combined Phonemes: Consonant-vowel combinations
  - Whole Words: Complete words in the Tunic language
- **Game Types**:
  - Random Practice: Study random cards
  - Review Mode: Focus on previously missed cards
- **Progress Tracking**: Track correct/incorrect answers
- **Responsive Design**: Works on desktop and mobile devices
- **Custom SVG Integration**: Dynamic SVG rendering for language symbols

## 🎮 How to Use

1. **Select a Learning Mode**: Choose from Simple Phonemes, Combined Phonemes, or Whole Words
2. **Choose Game Type**: Practice random cards or review previously missed ones
3. **Study**: Click cards to flip them and reveal answers
4. **Rate Yourself**: Mark answers as correct or incorrect
5. **Track Progress**: View your results and continue learning

## 🤖 AI Development Experiment

This project was **almost completely written with AI** as part of a personal experiment to test the current capabilities of various AI development tools. I wanted to see how well these tools could handle a real-world project with specific requirements.

### AI Tools Used

- **[Lovable](https://lovable.dev)** - Primary development platform
- **[Cline](https://github.com/cline/cline)** with Claude - VS Code extension for AI-assisted coding
- **Claude (Anthropic)** - Backend reasoning and problem-solving

### Key Findings

#### ✅ What Worked Well

- **Rapid prototyping**: Going from concept to working application in hours
- **UI/UX implementation**: Excellent at implementing modern React patterns and Tailwind CSS
- **Code structure**: Generated well-organized, maintainable code with proper TypeScript types
- **Component logic**: Handled complex state management and React patterns effectively
- **Styling**: Created responsive, polished interfaces with shadcn/ui components

#### ⚠️ Challenges Encountered

- **Inconsistent behavior**: Sometimes produces odd or plain wrong solutions
- **Framework integration**: Difficulty with less mainstream libraries, even with documentation
- **Forgetting framework**: Sometimes AI forgets what frameworks are being used and will do thing manually - such as not using Lucide
- **Legacy library support**: Had to manually implement SVG.js integration despite it being a known library
- **Debugging limitations**: Cannot always root cause bugs even with full stack traces and detailed behavior descriptions

#### 🔧 Technical Challenges

- **SVG.js Integration**: Despite SVG.js being a well-documented library, the AI struggled with proper integration and I had to manually fix the implementation
- **State management**: Complex game state transitions sometimes produced unexpected behaviors
- **Error handling**: Some edge cases weren't properly handled initially

## 🛠️ Technologies Used

This project is built with:

- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **SVG.js** - SVG manipulation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 🐛 Known Issues

- **Review Mode Crash**: If you finish reviewing cards you previously got wrong and click "Play Again" when there are no cards left to review, the application will crash
- **SVG Rendering**: Occasional rendering issues with complex SVG elements

## 🚀 Development Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build react to JS
npm run build

```
