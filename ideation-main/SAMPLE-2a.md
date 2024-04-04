# Chrome Extension Idea: Vocabulary Builder

## Authors

Emily Johnson, Alex Patel, Sam Thompson, Olivia Davis

## Problem Statement

Many people wish to expand their vocabulary but struggle to find the time or resources to do so effectively. While reading online, they often encounter unfamiliar words but may not have the motivation or means to look up definitions and commit them to memory. This extension aims to streamline the vocabulary learning process by providing definitions in context and allowing users to easily create Anki flashcards for spaced repetition learning.

## Target Audience

The target audience for Vocabulary Builder includes:

- Students looking to improve their language skills and academic performance
- Professionals seeking to enhance their communication and writing abilities
- English language learners aiming to expand their vocabulary
- Anyone interested in personal growth and language mastery

## Description

Vocabulary Builder is a Chrome Extension that helps users learn new words while browsing the web. It highlights uncommon words, provides definitions in context, and allows users to create Anki flashcards with a single click for spaced repetition learning.

## Selling Points

1. Seamless integration with web browsing experience
2. Customizable word difficulty levels and learning preferences
3. In-context definitions for immediate understanding
4. One-click Anki flashcard creation for spaced repetition learning
5. Vocabulary history and progress tracking

## User Stories

1. As a high school student, I want to easily create Anki flashcards for new words I encounter while reading online, so that I can expand my vocabulary and improve my academic performance.
2. As a non-native English speaker, I want to see definitions for unfamiliar words in context while browsing the web, so that I can better understand the content and learn new vocabulary.
3. As a busy professional, I want to quickly save new words and their definitions to Anki for later review, so that I can efficiently improve my language skills without disrupting my work.
4. As a language enthusiast, I want to customize the difficulty level of words highlighted by the extension, so that I can focus on learning vocabulary that is appropriate for my skill level.
5. As a user with limited time, I want to review my saved vocabulary words using Anki's spaced repetition system, so that I can effectively commit them to long-term memory.
6. As a student preparing for a standardized test, I want to prioritize learning academic and high-level vocabulary, so that I can improve my performance on verbal sections.
7. As a user who reads content on various topics, I want the extension to highlight uncommon words across different domains, so that I can develop a well-rounded vocabulary.
8. As a lifelong learner, I want to track my vocabulary progress over time, so that I can stay motivated and see the impact of my learning efforts.
9. As a user who sometimes forgets to review flashcards, I want the extension to remind me to study my saved words in Anki, so that I can maintain a consistent learning habit.
10. As a language tutor, I want to recommend this extension to my students as a supplementary tool, so that they can reinforce their vocabulary learning outside of our lessons.

## Notes

The extension will need to handle different forms of words (e.g., tenses, plurals) and understand the context to provide accurate definitions. We will leverage the genanki-js library to generate Anki flashcards, which will be exported as an .apkg file for users to import into their Anki app. The main challenges will be developing an accurate algorithm for identifying uncommon words and providing a smooth user experience for flashcard creation and export.

## References & Inspiration

- Merriam-Webster Dictionary API (https://dictionaryapi.com/)
- Anki: Spaced repetition flashcard system (https://apps.ankiweb.net/)
- genanki-js: JavaScript library for generating Anki decks (https://github.com/krmanik/genanki-js)

## Technical Details

### User Interface

The extension will have a minimalist design to blend seamlessly with the user's browsing experience. Key UI elements include:

1. Highlighted words: Uncommon words will be highlighted with a subtle underline or background color.
2. Definition tooltip: Clicking on a highlighted word will display a tooltip with its definition and part of speech.
3. "Add to Anki" button: Users can click this button in the tooltip to create an Anki flashcard for the word.
4. Vocabulary history page: Accessible from the extension icon, this page will display a list of all words the user has encountered and added to Anki.
5. Settings page: Users can customize word difficulty levels, toggle highlighting, and manage Anki export settings.

We will use the following Chrome UI/UX elements:

- Content scripts: To detect and highlight uncommon words on web pages
- Browser action: To open the vocabulary history and settings pages
- Storage: To store user preferences, word history, and Anki export settings
- Sidebar: Optionally, we could display the vocabulary history as a sidebar for quick access while browsing

### API, Libraries, and Frameworks

- Chrome Extension API: For building the core extension functionality (https://developer.chrome.com/docs/extensions/reference/)
- Merriam-Webster Dictionary API: To fetch word definitions (https://dictionaryapi.com/)
- genanki-js: To generate Anki flashcards in the browser (https://github.com/krmanik/genanki-js)
- jQuery: For simplified DOM manipulation and AJAX requests (https://jquery.com/)

### Data Storage

We will use Chrome's local storage to store the following data:

User Preferences:

- Word difficulty level (e.g., beginner, intermediate, advanced)
- Highlighting toggle (on/off)
- Anki export settings (e.g., deck name, card template)

Word History:

- Array of objects containing word, definition, context sentence, and timestamp

## Project Management

### Collaboration and Task Allocation

- **Leader:** Emily Johnson (project vision and UI design)
- **Manager:** Alex Patel (project management and team coordination)
- **Remaining Team Members:**
  - Sam Thompson (backend development and API integration)
  - Olivia Davis (frontend development and UI implementation)

The team will collaborate using GitHub for version control and code sharing, Slack for communication, Google Meet for weekly meetings, Figma for UI design, and GitHub Project for task management. They will follow a Kanban/Agile development methodology with one-week sprints and regular stand-up meetings.

### Risks and Mitigation

- **Risk 1:** Highlighting too many words and overwhelming the user
  - Mitigation: Fine-tune the algorithm for detecting uncommon words and allow users to adjust the word difficulty level

- **Risk 2:** Providing inaccurate or out-of-context definitions
  - Mitigation: Use reliable dictionary APIs and implement basic context analysis to select appropriate definitions

- **Risk 3:** Difficulty in generating and exporting Anki flashcards
  - Mitigation: Thoroughly test the genanki-js library and provide clear instructions for importing .apkg files into Anki

### Milestones and Timeline

#### Week 1

- Set up the development environment and create the extension skeleton
- Implement word detection and highlighting functionality
- Integrate the Merriam-Webster Dictionary API for definitions

#### Week 2

- Develop the "Add to Anki" feature using genanki-js
- Create the vocabulary history page and settings page
- Implement user preferences and customization options

#### Week 3

- Refine the UI and improve visual design
- Conduct user testing and gather feedback
- Optimize performance and fix bugs

#### Week 4

- Add final touches and polish
- Prepare user documentation and promotional materials
- Submit the extension to the Chrome Web Store for review
