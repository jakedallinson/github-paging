"use strict";
const request = require('request')

module.exports = readPages;

function readPages(options, callback)
{
    if (!options) { callback("Error: No options specified", null); return; }
    // make the request
    request(options, (err, res, body) => {
        if (res.statusCode != 200) { callback("Error: status code " + res.statusCode + "\n" + body, null); return; }
        // get the local page from request
        let local_page = JSON.parse(body);
        if (!lastPage(res.headers.link)) {
            // not last page so make another request with new options
            let url = parseLink(res.headers.link, callback);
            if (!url) { callback("Error: No link was found", null); return; }
            let new_options = options;
            new_options.url = url;

            // TODO: is err being passed correctly?
            readPages(new_options, (err, pages) => {
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
    if (!link) { return null; }
    let arr = link.match(/<([^>]+)>;\srel=\"next\"/);
    if (arr) { return arr[1]; }
    else { return null }
}
