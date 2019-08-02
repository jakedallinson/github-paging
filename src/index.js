"use strict";
const request = require('request')

module.exports = readPages;

function readPages(url, callback)
{
    if (!url) { callback("Error: No url specified", null); return; }
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
        if (res.statusCode != 200) { callback("Error: status code " + res.statusCode + "\n" + body, null); return; }
        // get the local page from request
        let local_page = JSON.parse(body);
        if (!lastPage(res.headers.link)) {
            // not last page so make another request
            let url = parseLink(res.headers.link);
            // TODO: is err being passed correctly?
            readPages(url, (err, pages) => {
                callback(err, pages.concat(local_page));
            });
        } else {
            callback(null, local_page);
        }
    });
}

function lastPage(link)
{
    return !parseLink(link);
}

function parseLink(link)
{
    if (!link) { callback("Error: No link was found", null); return; }
    let arr = link.match(/<([^>]+)>;\srel=\"next\"/);
    if (arr) { return arr[1]; }
    else { return null }
}
