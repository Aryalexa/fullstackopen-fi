## Versions
npm -v
8.5.5 -> 10.2.4

node -v
v17.8.0 -> v20.11.1

## Create a Vite app

```bash
# create
npm create vite@latest APPNAME -- --template react
# install
cd APPNAME
npm install

# run as dev
npm run dev
```
The console says that the application has started  http://localhost:5173/

## App project dependencies
development dependencies uses `--save-dev`
```bash
npm install axios
npm install json-server --save-dev
npm install express
npm install --save-dev nodemon
```
update the dependencies of the project with:
``npm update``
## Create a basic app
- Create a new template for our application with `npm init` and answer the questions. 
- A package.json file will be generated.


## Adding a "server"
Install JSON server
``npm install -g json-server``
add the script to `package.json` scripts.
``    "server": "json-server -p3001 --watch db.json"``
now we can do this to run it
```bash
npm run server
```

## API-Keys and Env variables
use an environment variable to save the key.
link: https://vitejs.dev/guide/env-and-mode.html

Assuming the api-key is 54l41n3n4v41m34rv0, when the application is started like so:
```bash
export VITE_SOME_KEY=54l41n3n4v41m34rv0 && npm run dev # For Linux/macOS Bash
($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) # For Windows PowerShell
set "VITE_SOME_KEY=54l41n3n4v41m34rv0" && npm run dev # For Windows cmd.exe
```
you can access the value of the key from the import.meta.env object:
```js
const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup
```


## MORE NOTES
Node
- Node.js is a JavaScript runtime environment
- npm is a tool used for managing JavaScript packages. It originates from the Node ecosystem.
- run js with: `node my_file.js`
- nodemon - it watches the files in the directory, and if any files change, it will automatically restart your node application. (install as dev dependency)
  - to start the app: `node_modules/.bin/nodemon index.js` or add the script: `"dev": "nodemon index.js"`
  - the backend server restarts automatically
  - the hot reload functionality in the browser is not added. (react has it)

JS
- JS engines, or runtime environments follow the asynchronous model 
  - code execution continues immediately after calling an IO function, without waiting for it to return
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- JS engines are single-threaded, which means that they cannot execute code in parallel. That's why it need a non-blocking model for executing IO operations.
  - if some code execution takes up a lot of time, the browser will get stuck for the duration of the execution
  - For the browser to remain responsive, the code logic needs to be such that no single computation can take too long.
- array `push` vs `concat`
  - push: (functional programming) use of immutable data structures (inplace)
  - concat: creates a new array with the added item. (returns a new array)

Axios
- library for communication between the browser and server
- instead of the fetch method (https://developer.mozilla.org/en-US/docs/Web/API/fetch)

Web
- browsers don't yet support the newest features of JS => the code running in the browser must be transpiled with e.g. babel.
- Node in the backend supports a large majority of the latest features of JS (we can use the latest features without having to transpile our code)
- The event loop:  [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
  - In today's browsers, it is possible to run parallelized code with the help of so-called web workers. 
  - The event loop of an individual browser window is, however, still only handled by a single thread.

Express
- library (add it as dependency)
- offers a more pleasing interface to work with the built-in http module
- provide a better abstraction for general use cases we usually require to build a backend server.

## React
- JS framework
- state hooks
- Effect-hooks
  - Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.