# FancyScroll - jQuery Plugin
http://bgcom.ch/ Copyright (c) 2012 B+G & Partners | created by Kevin Wenger

## General Notes
In an effort to move the plugin forward, support for old jQuery version has been dropped.

## Updates
New callback `afterSmoothClick()` fired after click on link's menu.
e.g Tracking Google analytic 
`afterSmoothClick: function(target){ _gaq.push(['_trackEvent', 'menu', target]) }`

## Examples
See [demo](https://github.com/bgcom/responsive-scroller/tree/master/demo) for complete example.

## Properties

### activeClass: 
`activeClass` allow you to change the active class you use.*

### elemActivate:
Which element you want to active with `activeClass`.*

### debug: 
`debug` verbose mode.*

### scroll: 
#### active: 
`active` allow you to active (or not) this functionnality.*

#### offset: 
`offset` use to adjuste your scrolling animation .*

#### axis: 
`axis` allow you to choose the axis of scrolling animation.*

#### duration: 
`duration` allow you to choose the duration of scrolling animation.*

#### afterSmoothClick: *{new}*
`afterSmoothClick(string Target)` is a new callback event fired after a click on menu. This function give you href target (the anchor) as string

### spy: 
#### active: 
`active` allow you to active (or not) this functionnality.*


## Contributors
- [Kevin Wenger](https://github.com/Sudei) 