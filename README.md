# github-paging
[![Build Status](https://travis-ci.org/jakedallinson/github-paging.svg?branch=master)](https://travis-ci.org/jakedallinson/github-paging)

A node module for interfacing with paging via the [GitHub API](https://developer.github.com/v3/ "GitHub API")

Available at [npm](https://www.npmjs.com/package/github-paging "npm")

## Installation

This is a Node.js module available through the [npm](https://www.npmjs.com "npm") registry. Install using:

`npm i github-paging`

## Features

* Interface with the GitHub API seamlessly for paging
* With a personal access token from GitHub, get public and private users from an organization

## Usage

```js
let paging = require('github-paging');
let options = {
    url: 'https://api.github.com',
    headers: {
        'user-agent': 'github-paging',
        'Accept': 'application/vnd.github.mercy-preview+json',
    },
};

paging(options, (err, pages) => {
    if (err) { console.log(err); return; }
    console.log(pages);
});
```

## Rate Limiting

For unauthenticated requests, GitHub's rate limit allows for up to 60 requests per hour. Use an access_token to make up to 5000 requests per hour.

## Other Options

```js
let options = {
    url: 'https://api.github.com',
    proxy: null;
    qs: {
        'per_page' : '100', // default is 100
        'page': '1', // what page to start on
        'access_token' : '', // personal access token from github
    },
    headers: {
        'user-agent': 'github-paging',
        'Accept': 'application/vnd.github.mercy-preview+json',
    },
};
```

## Tests

To run the test suite, first install the dependencies then run the tests:

`npm install`

`npm test`

## Contributing

[Contributing Guide](https://github.com/jakedallinson/github-paging/blob/master/CONTRIBUTING.md "Contributing Guide")