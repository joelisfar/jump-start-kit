# jump-start-kit

[Demo Site](https://joelisfar.github.io/jump-start-kit/)

Sometimes getting started is the hardest part. That’s why I made this collection of some generic stuff I use on almost every new project. There are a handful of SCSS files set up with my commonly used extensions, base styles, and layout rules. I’ve included my column-sizing functions, including the overlay markers. Plus there’s a sample hero component to get you started.

There’s not much here so I’ll likely add more in the future. But this should hold you over for now.

# Getting Started
This project uses gulp for scss compilation and [Browsersync](https://browsersync.io) for live reloading

Make sure you have *Node* installed

* Run `npm install` from the root of this project
* Run `gulp` to start Browersync and auto reloading and compilation

A [Codekit](https://codekitapp.com) config is also included

# Browser Support
This kit should support all browsers that have [flex](https://caniuse.com/#search=flex) support. Gulp is set to support last 5 browser versions and >1% of browsers, so feel free to adjust this as needed.