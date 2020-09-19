# purj

Purge and Purify JS: This library extends standard JavaScript classes and adds some helper functionality - all in pure, modern, lightweight JavaScript.

Trying to mimic some of the commonly-used (basic) jQuery functionality for iterating through elements, adding event listeners, etc. without all the extra fluff that comes along with it.

jQuery is close to 90kb minified, and even the slim version is still around 72kb. Gzipped or not, that's a lot of blocking in a time where blocking time is precious (ahem, Lighthouse).

purj will be providing only minimal helpers to achieve some of the commonly-used logic from jQuery. It will not (nearly) meet all of them. No AJAX or animations. No CSS helpers. No daisy chaining. No selector parsing. Just simple JavaScript.

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
  types,
  collections,
  elements,
  listener
} from 'purj';
```

## Features

As purj is still very young, there are only a few features right now...

* `Array.apply(callback)` - Run callback on every item in array. The callback is passed the iteration index, and `this` is the item.
  ```js
  var arr = ['one', 'two', 'three'];
  arr.apply(function(i) {
    console.log(i + '. ' + this);
  });
  // 0. one
  // 1. two
  // 2. three
  ```
* `Array.first()` - Retrieve first item from array.
* `Array.last()` - Retrieve last item from array.

* `document.find(selector)` - Shortcut for document.querySelectorAll(). Find all elements in document matching selector.
* `document.pluck(selector)` - Shortcut for document.querySelector(). Find first element in document matching selector.

* `Element.find(selector)` - Find all children matching element.
* `Element.pluck(selector)` - Find first child matching selector.
* `Element.findParent(selector)` - Find first parent element matching selector.
* `Element.getData(?name)` - Get attribute data-name from element. If name is omitted, return hash of all data attributes on element.
* `Element.setData(data, ?val)` - Set data data-data attribute on element. If data is an object, val is ignored and every key in data is added as a data atribute to element.
* `Element.on(event, callback, ?options)` - Shortcut for element.addEventListener().

* `NodeList.apply(callback)` - Run callback on every element in list. Same details as `Array.apply`.
* `NodeList.first()` - Retrieve first element from list.
* `NodeList.last()` - Retrieve last element from list.
* `NodeList.on(event, callback, ?options)` - Shortcut for adding an event listener to each element in list.
  ```js
  document.find('a').on('click', function(e) {
    console.log(this, e);
  });
  ```

* `String.camelize()` - Convert `this-dashed-string` to `thisDashedString`.

* `listener.on(event, selector, callback)` - Adds event listener to the DOM for dynamic elements. Mimics jQuery's `$(document).on()` in this way.
  For example:
  ```js
  listener.click('a.logo', function(e) {
    e.preventDefault();
    this.classList.add('clicked');
  });
  ```
  If you need to support IE, you cannot use the event name as a function.
  Instead, use the on() function, which is what gets called anyway:
  ```js
  listener.on('click', 'a.logo', function(e) {
      e.preventDefault();
      this.classList.add('clicked');
  });
  ```
  These 2 blocks behave exactly the same.
