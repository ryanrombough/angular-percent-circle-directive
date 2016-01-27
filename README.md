# Angular Percent Circle Directive

<img src="https://raw.githubusercontent.com/ryanrombough/angular-percent-circle-directive/master/src/img/example1.PNG" width="200px">

[AngularJS](http://angularjs.org/) directive for adding animated percent circle.

## Getting started

### Install via Bower or Node

```bash
bower install --save angular-percent-circle-directive
```

or

```bash
npm install --save angular-percent-circle-directive
```

### Link to CSS File

```html
<link rel="stylesheet" type="text/css" href="path/to/dist/percent-circle.css">
```
Alternatively, if you are using Sass, you can import the provided .scss file into your library

```css
@import "path/to/angular-percent-circle-directive/dist/percent-circle";
```

### Add Script Tag

```html
<script src="path/to/dist/percent-circle-directive.js" type="text/javascript"></script>
```

### Include the `percentCircle-directive` dependency in your Angular App

```javascript
var app = angular.module('percentCircleDemo', ['percentCircle-directive']);
```

That's it! The directive should now be ready to use.

## How to use it

### Call the Directive

Enter the `percent-circle` tag into your HTML where you would like the percent circle to appear.

```html
<percent-circle percent="myPercentModel"></percent-circle>
```

`percent` is a required attribute. It can either be a number or the name of the scope variable where the percent number is stored (`myPercentModel`, in the above case).

### Customize the Colors

The directive takes an optional attribute called `colors`. The value should be an object with one or all of the following keys:

```javascript
{
	center    : 'lightBlue', // the color in the center of the circle. Default: #F5FBFC
	highlight : 'black', // the highlighted section of the circle, representing the percentage number. Default: #2BCBED
	remaining : 'lightGrey' // the color of the circle before highlighting occurs, representing the amount left until the percent equals 100. Default: #C8E0E8
}
```

The above customization would appear as:
<img src="https://raw.githubusercontent.com/ryanrombough/angular-percent-circle-directive/master/src/img/example2.PNG" width="100px">

Add the `colors` attribute to the `percent-circle` HTML tag like this:

```html
<percent-circle percent="myPercentModel" colors="{center:'green'}"></percent-circle>
```

The above will change the center of the circle to be green, but continue to use the default colors for `highlight` and `remaining`.

### Customize the Speed

The directive takes an optional attribute called `speed`. The value should be a number representing the amount of milliseconds between each percentage increment. Default is 10.

Add the `speed` attribute to the `percent-circle` HTML tag like this:

```html
<percent-circle percent="myPercentModel" speed="20"></percent-circle>
```
If you do not want the animation, simply set the `speed` attribute to `false`.

```html
<percent-circle percent="myPercentModel" speed="false"></percent-circle>
```
Now the percent circle will jump to the provided percent without incrementing.

