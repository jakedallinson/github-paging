# github-paging
[![Build Status](https://travis-ci.org/jakedallinson/github-paging.svg?branch=master)](https://travis-ci.org/jakedallinson/github-paging)

A node module for interfacing with paging via the GitHub API

## Overview

If a GH access token is given, then public and private members can be returned from `/orgs/:org/members`

## Installation

`npm i github-paging`

## Usage

```
var paging = require('github-paging');
let url = 'https://api.github.com/orgs/Comcast/members?access_token=' + <access_token> + '&per_page=100'
paging(url, (err, pages) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(pages.length);
});
```

## Tests

`no tests available yet`

## Contributing

coming soon