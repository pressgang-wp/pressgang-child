# A Grunt Template for setting up a Pressgang ready Wordpress Child Theme
- Install Grunt CLI http://gruntjs.com/getting-started.
- Install Grunt Scaffolding - https://gruntjs.com/project-scaffolding
- Create folder for child theme in: `wp-content/themes/[pressgang-child]`
- Init local Grunt in child theme directory with: `sudo npm install grunt --save-dev`
- Clone this repo `git clone https://github.com/pressgang-wp/pressgang-child.git ~/.grunt-init/pressgang-child`
- grunt init the pressgang-child template: `grunt-init --force pressgang-child`

#### Directory Structure
```
.
|-- css
   + styles.css
|-- js
|-- lang
|-- scss
  + styles.scss
|--views
+ functions.php
+ Gruntfile.js
+ style.css
```
