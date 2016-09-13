# Monoture Testimonials
Testimonials plugin for Monoture

## Features
* Easily upload testimonials through the Monoture dashboard
* Attach images to customer testimonials

# Installation
```
$ npm install monoture-testimonials --save
```

# Sample Usage
```
var monoture = require('monoture');
var testimonials = require('monoture-testimonials');

// Plugins
monoture.registerPlugin(testimonials);

monoture.run();
```

The Testimonial model can be access via Monoture directly;

```
var Testimonial = monoture.testimonial;
```
