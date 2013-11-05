# froute [![Build Status](https://travis-ci.org/leecrossley/froute.png?branch=master)](https://travis-ci.org/leecrossley/froute) [![npm version](https://badge.fury.io/js/froute.png)](https://npmjs.org/package/froute) [![Dependency Status](https://david-dm.org/leecrossley/froute/status.png)](https://david-dm.org/leecrossley/froute#info=dependencies)

**Simple and powerful routing for node with expressive matching.**

![froute](froute-logo.png)

## Getting started

```
npm install froute --save
```

```
var froute = require("froute");
```

## Examples

### Binding a froute template

```javascript
var template = "/apple/{type}",
    bindResult = froute.bind(template, callback);

expect(bindResult).toBeTruthy();
expect(froute.list().length).toEqual(1);
```

### Unbinding a froute template

```javascript
var unbound = froute.unbind(template);

expect(unbound.length).toEqual(1);
```

### Full example, bind and dispatch

```javascript
var template = "/apple/{type}/size/{size}",
    resultParams;

var bindResult = froute.bind(template, function(params) {
    resultParams = params;
});

var dispatchResult = froute.dispatch("/apple/gala/size/large");

expect(bindResult).toBeTruthy();
expect(dispatchResult).toBeTruthy();
expect(froute.list().length).toEqual(1);
expect(resultParams).toEqual({type:"gala",size:"large"});
```