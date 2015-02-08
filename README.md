# ProjectBlocker

[![Bower version](https://badge.fury.io/bo/project-blocker.png)](http://badge.fury.io/bo/project-blocker)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

A handy jQuery solution for blocking responsive, IE, or incomplete bits from being seen while in development.

[GitHub](https://github.com/mike-zarandona/ProjectBlocker) | [Demo](http://codepen.io/mike-zarandona/full/bNYvmw/)

_Features_:
- **Block responsive web design** - gives you the ability to demo coded previews without worrying about how the project might look on mobile devices.
- **Block the frontpage** - show a polite message that a page isn't yet ready to be viewed to keep visitors out of broken or unfinished areas of preview sites.
- **Block Internet Explorer** - _duh_.
- **Customizable and friendly blocking messages** - because good UX is the right thing to do.
- **Bypass for developers** - for sanity.

![ProjectBlocker in Action](http://i.imgur.com/Vliy8dR.gif)

<br />



## Getting Started
1. Include jQuery.
1. Include `dist/jquery.projectblocker.min.js`.
1. When the `document` is `ready()`, initialize **`ProjectBlocker`**:

```javascript
$(document).on('ready', function() {
	$.projectBlocker();
});
```

### Full Example
```javascript
$(document).on('ready', function() {
	$.projectBlocker({
		responsive: 'hide',
		maxWidth: 1200,

		frontpage: 'hide',
		frontpageSelector: '#wrapper.homepage',

		ie: 'hide'
	});
});
```

When all else fails, check out the `demo/`.

<br />



## A Note on Functionality
**`ProjectBlocker`** blocks responsive web design by throwing up the friendly blocking message plus overlay, but _also_ adds a CSS `max-width` property to the `<body/>` so that things don't look broken underneath.  We just thought you might like to know.

<br />



## Developer Workaround
Once **`ProjectBlocker`** has been initialized using the Getting Started steps, it will be immediately active for all visitors.  This is awesome, but becomes a huge pain once development resumes.  To fix that, we have some handy URL flags:

### `?dev=true`
Append this to the end of your URL to _bypass_ **`ProjectBlocker`** and enable `Developer Mode`.  You'll get a handy console notification letting you know that **`ProjectBlocker`** is still running (after the first refresh), but is letting you through since you're cool.

Additionally the script will write a `localStorage` key value pair matched to the URL on which you're browsing.  This means that you only have to use `?dev=true` once and it will continuously let you through without bugging you each time, even if you don't use this URL flag in future.  How nice.

### `?dev=off`
Append this to the end of your URL to turn off `Developer Mode` to see the **`ProjectBlocker`** warnings as usual.

<br />



## Options
| Option 	| Type 	| Default 	| Description 	|
|--------	|------	|---------	|-------------	|
| **`responsive`** | _string_	| `'hide'`	| Hides or shows responsive web design to the visitor. Used along with `maxWidth`.	|
| **`minWidth`**	| _int_	| `'0'`	| The minimum viewing width of the page before the warning is introduced.	|
| **`frontpage`**	| _string_	| `'show'`	| Hides or shows the frontpage of the site. Used along with `frontpageSelector`.	|
| **`frontpageSelector`**	| _string_	| `null`	| Any time this jQuery selector is matched the page will be hidden. Handy for the frontpage or anything you're trying to block.	|
| **`ie`**	| _string_	| `'hide'`	| Hides or shows Internet Explorer.	|

<br />



## Customization with Grunt
[Grunt](http://gruntjs.com) was used to develop and build **`ProjectBlocker`** - this makes it very easy to grab a fork and modify the HTML and styles (written in LESS) to your bidding.

[GruntJS.com Getting Started: Working with an Existing Grunt Project](http://gruntjs.com/getting-started#working-with-an-existing-grunt-project)

**ProTip: _Don't forget to head into `html/jquery.projectblocker.html` and change the "Author" name!_**

### The Sources
The DOM structure of the overlay as well as the styles are **not** included in the main source script file (`src/jquery.projectblocker.js`).  They exist in their respective folders (`html/`, `less/`) and are made available in the minified version of the script through global variables.

#### HTML
HTML is built from `html/jquery.projectblocker.html`, and is made available in the global variable `pbOverlayDOM`.

#### Styles
Styles are built from `less/jquery.projectblocker.less`, and are made available in the global variable `pbStyles`.

### Building the Project
To build a fresh custom copy of **`ProjectBlocker`** first get started with Grunt by running `npm install`, then run `grunt build`. This will recompile the HTML (from `html/`) and LESS (from `less/`) into JavaScript global variables and append them into a freshly minified version at `dist/jquery.projectblocker.min.js`.

One _gotcha_ is that changes to the DOM of **`ProjectBlocker`** will likely require changes to the responsive design.  _Womp womp._

It is encouraged that developers inspect the demo as well as the HTML and LESS before customizing by running `grunt server`.

<br />



## Super Good Advice
**Remember to remove `ProjectBlocker` before going live!** Or for peace of mind write a conditional to only load  it on development and staging URLs. 

<br />



## Changelog

### 1.0.0
- Initial public release.

<br />


## Author
Mike Zarandona | [http://twitter.com/mikezarandona](http://twitter.com/mikezarandona)

<br />


## License
**`ProjectBlocker`** is available under the MIT license.