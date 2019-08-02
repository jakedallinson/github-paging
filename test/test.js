'use strict';

var expect = require('chai').expect;
var paging = require('../src/index');

describe('#paging', function() {
    it('tests are running', function() {
        let result = 0;
        expect(result).to.equal(0);
    });

    it('should return 370 members', function() {
        let url = 'https://api.github.com/orgs/Comcast/members?access_token=' + 'cb06655c524dc615233a0830f93cb68eccca5400' + '&per_page=100'
        paging(url, (err, pages) => {
            expect(pages.length).to.equal(370);
        });
    });
});