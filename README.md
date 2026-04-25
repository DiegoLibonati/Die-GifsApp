# Gif Dive

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Gif Dive** is a single-page web application for discovering and browsing animated GIFs powered by the [Giphy API](https://developers.giphy.com/). It lets you build a personal dashboard of GIF categories in real time, each one populated with a configurable number of results fetched directly from Giphy.

**Core features:**

- **Category search** — Type any keyword into the search field and press GO. A new section for that category is immediately added to the page and filled with GIFs matching your query.
- **Configurable result count** — A number input next to the search field controls how many GIFs are fetched per category. Change it before or between searches to get exactly the amount you want.
- **Surprise mode** — Hit the SURPRISE button to let the app fetch a completely random GIF from Giphy, extract its category automatically, and add it to your board. Useful for discovering unexpected content without having to think of a keyword.
- **Category management** — Each category card has its own delete button so you can remove individual sections when you are done with them. A global REMOVE ALL CATEGORIES button clears the entire board at once.
- **Duplicate prevention** — Submitting a category that already exists on the board is silently ignored, keeping the layout clean.
- **GIF preview modal** — Clicking the title of any GIF opens it in a full-screen modal overlay for a closer look. The modal closes with a single click on the X button, returning you to the board without losing any context.
- **Author information** — Each GIF card surfaces the Giphy creator's avatar, username, and bio. A direct link to the creator's Giphy profile and a one-click WebP download link are included for every GIF.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/gif-dive`](https://www.diegolibonati.com.ar/#/project/gif-dive)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
