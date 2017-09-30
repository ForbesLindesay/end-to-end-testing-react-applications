import * as assert from 'assert';
import cabbie from 'cabbie-sync';

const driver = cabbie('taxirank', {
  base: 'http://localhost:3000',
  debug: true,
});

driver.activeWindow.navigateTo('/');

const value = driver.activeWindow.getElement('[data-test-id="value"]');
assert.equal(value.getAttribute('value'), '');

value.sendKeys('Hello World');
assert.equal(value.getAttribute('value'), 'Hello World');

const reverse = driver.activeWindow.getElement('[data-test-id="reverse"]');
reverse.mouse.click();

assert.equal(value.getAttribute('value'), 'dlroW olleH');

driver.dispose();
