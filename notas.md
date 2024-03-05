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

Dependencies
```bash
npm install axios
npm install json-server --save-dev
```

## Add a "server"
Install JSON server
``npm install -g json-server``
add the script to `package.json` scripts.
``    "server": "json-server -p3001 --watch db.json"``
now we can do this to run it
```bash
npm run server
```

## API-Keys
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
- Node.js is a JavaScript runtime environment
- run js with: `node name_of_file.js`
- array `push` vs `concat`
  - push: (functional programming) use of immutable data structures (inplace)
  - concat: creates a new array with the added item. (returns a new array)
