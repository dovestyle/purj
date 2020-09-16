# purj

Purge and Purify JS: This library extends standard JavaScript classes and adds some helper functionality - all in pure, simple, lightweight JavaScript.

jQuery is close to 90kb minified, and even the slim version is still around 72kb. This library aims to provide a way to start migrating away from jQuery, and using pure JavaScript to achieve some of the same goals. Well, the most-used pieces.

Pure JavaScript ftw!

## Installation

Use npm or yarn to add the library to your project:
```js
npm i purj --save-dev

// or

yarn add purj --dev
```

Then include it wherever you need it:
```js
import {
  collections,
  elements,
  listener
} from 'purj';
```

## Features

* Standard Array extended with apply() function. Acts the same as map(), but
  current element is `this` and callback is passed the iteration index.
  ```js
  var list = ['one', 'two', 'three', 'four', 'five'];
  list.apply(function(i) {
    console.log(i + '. ' + this);
  });

  ```
  outputs:
  ```
  0. one
  1. two
  2. three
  3. four
  4. five
  ```

* Standard NodeList extended with the same apply() function as Array.
  ```js
  var list = document.querySelectorAll('a');
  list.apply(function(i) {
    console.log(i + '. ' + this.href);
  });
  ```
  might output something like:
  ```
  0. /
  1. /about
  2. /another-link
  ```

* Standard Element extended with findParent function. Pass it a selector
  to find the first parent element that matches it.
  ```js
  var el = document.querySelector('a.brand');
  var p  = el.findParent('nav');
  ```

* New Listener module for applying events. Uses full DOM listener for
  dynamic elements added after listener (like jQuery's `document.on()`).
  For example:
  ```js
  listener.click('a.logo', function(e) {
    e.preventDefault();
    this.classList.add('clicked');
  });
  ```
  If you need to support IE, you cannot use the event name as a function.
  Instead, use the add() function, which is what gets called anyway:
  ```js
  listener.add('click', 'a.logo', function(e) {
      e.preventDefault();
      this.classList.add('clicked');
  });
  ```
  These 2 blocks behave exactly the same.
