# purj

Purge and Purify JS: This library extends standard JavaScript classes and adds some helper functionality - all in pure, modern, lightweight JavaScript.

This library aims to provide an alternative to bulky jQuery. jQuery is close to 90kb minified, and even the slim version is still around 72kb. Gzipped or not, that's a lot of blocking in a time where blocking time is precious (ahem, Lighthouse).

purj encourages pure JavaScript as much as it can, providing only minimal helpers to achieve some of the commonly-used logic from jQuery. It will not meet all of them. There is no global function for selecting and iterating through elements. There are no helper functions for manipulating CSS or adding/removing classes. No AJAX. No animations. In my opinion, that is all fluff that can be achieved with intrinsic JavaScript (or CSS for animations) and a little more typing. These days, your code compiler/minifier should compress and consolidate that stuff for you anyway.

purj is only a few days old as of this writing. I wrote what's currently here to meet a requirement of my day job - trying to remove as much superfluous JavaScript as possible.

## Installation

You've got a couple options...

### External Script

You can source the dist script directly in your page:
```html
<script src="purj.min.js"></script>
```

### Yarn/NPM

Or, use yarn or npm to add the library to your project:
```js
yarn add purj --dev

// or

npm i purj --save-dev
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

As purj is still very young, there are only a few features right now...

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
