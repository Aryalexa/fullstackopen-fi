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


## NOTAS
- Node.js is a JavaScript runtime environment
- run js with: `node name_of_file.js`
- array `push` vs `concat`
  - push: (functional programming) use of immutable data structures (inplace)
  - concat: creates a new array with the added item. (returns a new array)
