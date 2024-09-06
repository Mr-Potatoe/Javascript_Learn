---

# Node.js Documentation

This guide will help you get started with Node.js, from installation to running a basic script.

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Installing on Windows](#installing-on-windows)
  - [Installing on macOS](#installing-on-macos)
  - [Installing on Linux](#installing-on-linux)
- [Verifying the Installation](#verifying-the-installation)
- [Creating and Running a Node.js Script](#creating-and-running-a-nodejs-script)
- [Node.js Package Manager (npm)](#nodejs-package-manager-npm)
- [Basic Usage Example](#basic-usage-example)

---

## Introduction

Node.js is a runtime environment that allows JavaScript to run on the server side or outside of a browser. It’s perfect for building fast, scalable network applications and is well-known for its non-blocking, event-driven architecture.

## Prerequisites

- Basic knowledge of the command line.
- Basic knowledge of JavaScript.

## Installation

### Installing on Windows

1. Go to the official [Node.js website](https://nodejs.org).
2. Download the latest **LTS (Long Term Support)** version for Windows.
3. Run the installer and follow the prompts, keeping default settings unless you have specific needs.
4. During installation, ensure **npm** (Node's package manager) is checked for installation.
5. Once installation is complete, restart your terminal or command prompt.

### Installing on macOS

1. Install Node.js via **Homebrew** (recommended). If you don’t have Homebrew, install it by following [this guide](https://brew.sh/).
   
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Once Homebrew is installed, install Node.js:

   ```bash
   brew install node
   ```

### Installing on Linux

For **Debian/Ubuntu**-based distributions:

1. Open your terminal and run:

   ```bash
   sudo apt update
   sudo apt install nodejs
   sudo apt install npm
   ```

For other Linux distributions, visit the official [Node.js website](https://nodejs.org) for installation instructions.

---

## Verifying the Installation

To verify that Node.js and npm were installed successfully, open your terminal or command prompt and type:

```bash
node -v
```

This should display the Node.js version installed.

```bash
npm -v
```

This will display the npm version installed.

---

## Creating and Running a Node.js Script

1. Open a terminal or command prompt.
2. Create a new JavaScript file (e.g., `script.js`):

   ```bash
   touch script.js
   ```

3. Open the file in your preferred editor (like VS Code) and write the following code:

   ```javascript
   console.log("Hello, Node.js!");
   ```

4. Save the file.
5. To run the script, return to the terminal and run the following command:

   ```bash
   node script.js
   ```

You should see the output:

```
Hello, Node.js!
```

---

## Node.js Package Manager (npm)

`npm` is the package manager that comes with Node.js. It allows you to install third-party libraries and packages that extend the functionality of your Node.js applications.

### Installing a package

To install a package, use the following command:

```bash
npm install <package-name>
```

For example, to install the `express` framework:

```bash
npm install express
```

### Using a Package

Once installed, you can require the package in your script and use it. For example:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

## Basic Usage Example

Here's a basic example of a Node.js server that returns "Hello, World!" when accessed via a web browser:

1. Create a new file, `app.js`:

   ```bash
   touch app.js
   ```

2. Write the following code:

   ```javascript
   const http = require('http');

   const server = http.createServer((req, res) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Hello, World!\n');
   });

   server.listen(3000, '127.0.0.1', () => {
     console.log('Server running at http://127.0.0.1:3000/');
   });
   ```

3. Save the file and run it with:

   ```bash
   node app.js
   ```

4. Open your browser and go to `http://127.0.0.1:3000/` to see the output.

---

## Conclusion

You’ve now installed Node.js, learned how to run basic scripts, and built a simple web server. Node.js is extremely versatile and can be used to create anything from command-line tools to full-stack applications.

For more information and in-depth guides, visit the official [Node.js documentation](https://nodejs.org/en/docs/).

---
