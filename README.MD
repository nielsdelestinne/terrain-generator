ND-DEIMOS
===

A project by Niels Delestinne

Usage
---
- `npm install`
- `gulp`
- open `dist/index.html`

Notes to self
---
- When ditching Node in the process of using Typescript, we have to use browserify. Typescript emits commonJS modules which Node uses.
When we stop using Node, we lose the commonJS functionality. The browser will throw 'cannot find Require' errors. By using Browserify, we make sure modules are again accessible.

Gulp-setup
---
Used resource: `https://www.typescriptlang.org/docs/handbook/gulp.html`