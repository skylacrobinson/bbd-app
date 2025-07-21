<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="left">


# Disney Browser Based Device - Take Home Assignment

<em>"The way to get started is to quit talking and begin doing." -Walt Disney</em>

This project is a simplified feature implementation of a Disney+ style home page interface, built with React and TypeScript. The app fetches content from a public JSON API and allows remote-style navigation using arrow keys. It combines modular components, focus management, component animations, and dynamic media handling to deliver seamless user experiences that prioritizes keyboard interactions.

<!-- BADGES -->
<img src="https://img.shields.io/github/languages/top/skylacrobinson/bbd-app?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/skylacrobinson/bbd-app?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with these tools and technologies:</em>
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="React">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white" alt="HTML 5">
</div>
<br>

---



## View Project

**Live Demo at https://skylacrobinson.github.io/bbd-app/**


## Features

- 🎯 **Focus Management:** Implements focus trapping and utilizes keyboard navigation for main user interactions.
- 🖼️ **Media Handling:** Supports dynamic image conversion, fallback images, and inline video playback for engaging multimedia experiences.
- ⚙️ **Modular Components:** Provides reusable UI elements like tiles, modals, and navigation aids for flexible interface design.
- 🔄 **Data Integration:** Facilitates efficient data fetching from Disney+ API and handles data inconsistencies with TypeScript.
- 🚀 **Magical Animations:** Incorporates fun user animations to when interactions occur with tiles and modals.


### Usage
This app was built to only require keyboard in put. Some of the keyboard commands include:

⬅️ ➡️ **Left & Right Arrows:** Navigate left and right between tiles
⬆️ ⬇️ **Up & Down Arrows:** Navigate up and down between collections
[  ] **Spacebar:** Selects focused tile to open details modal and also exits modal

**Further instructions are also included in the app**


### Future Possibilities

Something I love about web development is that the possibilities are endless when creating new components and interactions!

If I had more time to build this project and explore the possibilites, I would...

-Intergrate responsivenes to various devices and screen sizes
-Improve animation features, particularly exit animations
-Add unit and integration tests using Jest and React Testing Library


### Folder Structure
```sh
└── bbd-app/
    ...
    ├── src
    │   ├── App.css     //CSS styles
    │   ├── App.tsx     // Main layout and routing
    │   ├── components  // UI components (Tile, Modal, Row, etc.)
    │   ├── context     // Global navigation state
    │   ├── hooks-utils // Custom hooks and utility functions
    │   ├── index.html  // Main HTML
    │   ├── index.tsx   // Main TSX
    │   └── types       // TypeScript interfaces and types
    └── tsconfig.json
```



---

<div align="left"><a href="#top">⬆ Return</a></div>

---
