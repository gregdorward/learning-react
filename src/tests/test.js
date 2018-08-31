'use strict';

const puppeteer = require('puppeteer');
const pa11y = require('pa11y');


let page;
let browser;
let lhr;

beforeAll(async () => {
    // can be run in a browser by changing this to 'headless: false'
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
});
afterAll(() => {
    browser.close();
});



describe('Google Lighthouse audit tests', async () => {
    beforeAll(async () => {
        // the url to be audited
        const url = 'https://red-badger.com';
        // kick off a Lighthouse audit on the above url
    });


		it('runs a Pa11y accessibility audit', async () => {
					const audit = await pa11y('http://localhost:3000');
					const issues = audit.issues;
					if(issues){
						issues.map((item, i) =>
						console.log(item))
					}
					expect(audit.issues.length).toEqual(0);
		})

});
