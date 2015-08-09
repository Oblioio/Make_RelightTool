Installing Dependencies
--------------------

To get a local copy of the tool running you will need [Node.js](https://nodejs.org/), [Ruby](https://www.ruby-lang.org), [Gem](https://rubygems.org/), and a local web server. I use [MAMP](https://www.mamp.info).

Install [Compass](http://compass-style.org/install/), [Bower](http://bower.io/), and [Grunt](http://gruntjs.com/getting-started). Once those are installed, cd to the root of the repository and in the terminal, type `npm install` to install the node modules for grunt, then `bower install` to install the bower components, then `grunt watch`, which will automatically compile your sass while you edit it. 


Creating a new distribution build
--------------------

If you want to compile a build, type `grunt build` and it will write to your 'dist' folder.