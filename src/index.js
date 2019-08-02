"use strict";
const request = require('request')

module.exports = readPages;

function readPages(url, callback)
{
    let options = {
        url: url,
        proxy: null,
        headers: {
            'user-agent': 'github-paging',
            'Accept': 'application/vnd.github.mercy-preview+json',
        },
    };
    // make the request
    request(options, (err, res, body) => {
        // get the local page from request
        let local_page = JSON.parse(body);
        if (!lastPage(res.headers.link)) {
            // not last page so make another request
            let url = parseLink(res.headers.link);
            readPages(url, (pages) => {
                callback(pages.concat(local_page));
            });
        } else {
            callback(local_page);
        }
    });
}

function lastPage(link)
{
    return !parseLink(link);
}

function parseLink(link)
{
    let arr = link.match(/<([^>]+)>;\srel=\"next\"/);
    if (arr) { return arr[1]; }
    else { return null }
}
