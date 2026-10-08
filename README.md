# Challenges App

A React + TypeScript app for creating and tracking personal challenges, with smooth animations powered by Framer Motion.

## Features

- Welcome page with scroll-based parallax effects
- Create challenges with a title, description, deadline and image
- Tabs for Active / Completed / Failed challenges with animated badges and a sliding tab indicator
- Mark challenges as completed or failed
- Expandable challenge details
- Animated modal with staggered image selection
- Form validation with a shake animation on invalid input
- Global state managed with React Context

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)

## Getting Started

```bash
# clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# install dependencies
npm install

# start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview the production build |

## Project Structure

```
src/
├── assets/        # images and image list
├── components/    # Badge, ChallengeItem, ChallengeTabs, Challenges, Header, Modal, NewChallenge
├── pages/         # Welcome, Challenges
├── store/         # challenges context and provider
├── types/         # shared TypeScript types
├── App.tsx
└── main.tsx
```

## Routes

| Path          | Page                       |
| ------------- | -------------------------- |
| `/`           | Welcome page               |
| `/challenges` | Challenges list and manager |
