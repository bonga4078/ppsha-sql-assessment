# SQL Claims Assessment

A static, browser-based SQL assessment for data analyst candidates. It runs entirely on GitHub Pages with no Node server, database server, npm installation, or build command.

## Features

- 10 SQL questions across Easy, Medium and Hard levels
- Synthetic medical claims and membership data
- In-browser SQLite powered by sql.js
- SQL syntax highlighting powered by Ace Editor
- SQL keyword-only completion suggestions
- Query execution and automatic result checking
- Responsive light and dark modes
- Candidate progress saved in browser local storage

## Run locally

Because the site loads JavaScript libraries from a CDN, open `index.html` while connected to the internet. For the most consistent browser behaviour, use a simple local server such as VS Code Live Server.

## Deploy to GitHub Pages

1. Put `index.html`, `styles.css`, and `app.js` in the root of your GitHub repository.
2. Commit and push the files to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/(root)`, then click **Save**.
6. After GitHub finishes deployment, open the URL shown on the Pages settings screen.

No `npm run build` or `gh-pages` package is required.

## Important assessment limitation

This is a client-side assessment. The question definitions, expected-answer queries, and synthetic database are downloaded to the candidate's browser, so a technically knowledgeable candidate can inspect them using browser developer tools. It is suitable for supervised screening, practice, demonstrations, and low-stakes assessments. For secure recruitment testing, move answer validation and attempt storage to a protected backend service.

## Customize

- Edit question text and expected SQL in the `questions` array in `app.js`.
- Edit synthetic data in the `claims` and `memberships` arrays.
- Adjust colours in the CSS variables at the top of `styles.css`.
- Do not use real member or claims data in a public GitHub repository.
