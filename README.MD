Terrain Generator
===

Generate unique 2D terrains with Terrain Generator.
- Possiblity to polish off the result
- Generation is done by self-devised algorithms
- An experiment that is somewhat finished :)

Usage
---
- `npm install`
- `gulp`
- open `dist/index.html`
- url parameters: `&seed=56&type=MAIN&tile=10`

Notes to self
---
- When ditching Node in the process of using Typescript, we have to use browserify. Typescript emits commonJS modules which Node uses.
When we stop using Node, we lose the commonJS functionality. The browser will throw 'cannot find Require' errors. By using Browserify, we make sure modules are again accessible.

Gulp-setup
---
Used resource: `https://www.typescriptlang.org/docs/handbook/gulp.html`
