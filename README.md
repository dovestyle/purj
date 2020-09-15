# purj

Purge and Purify JS: This library extends standard JavaScript classes and adds some helper functionality - all in pure, simple, lightweight JavaScript.

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
} from purj;
```

## Features

* Standard Array extended with apply() function. Acts the same as map(), but
  current element is `this` and callback is passed the iteration index.

* Standard NodeList extended with the same apply() function as Array.

* Standard Element extended with findParent function. Pass it a selector
  to find the first parent element that matches it.

* New Listener module for applying events. Uses full DOM listener for
  dynamic elements added after listener (like jQuery's `document.on()`).

  Example 1:
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

  These 2 calls are exactly the same.
