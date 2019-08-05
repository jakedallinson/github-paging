'use strict';

var expect = require('chai').expect;
var paging = require('../src/index');

describe('#paging', function() {
    it('basic test', function() {
        let x = 0;
        expect(x).to.equal(0);
    });

    it('github api is online', function(done) {
        let options = {
            url: 'https://api.github.com',
            headers: {
                'user-agent': 'github-paging',
                'Accept': 'application/vnd.github.mercy-preview+json',
            },
        }; 
        paging(options, (err, pages) => {
            expect(err).to.equal(null);
            done();
        });
    });

    it('paging correctly', function(done) {
        let options = {
            url: 'https://api.github.com/orgs/Github/members',
            headers: {
                'user-agent': 'github-paging',
                'Accept': 'application/vnd.github.mercy-preview+json',
            },
        }; 
        paging(options, (err, pages) => {
            expect(pages.length).to.be.at.least(101);
            done();
        });
    });
});