import * as assert from 'assert';
import cabbie, {waitFor, SelectorTypes} from 'cabbie-sync';

const driver = cabbie('chromedriver', {
  base: 'https://www.dominos.co.uk/',
  debug: true,
});

driver.activeWindow.navigateTo('/');

const postCodeInput = driver.activeWindow.getElement(
  '[placeholder="Enter your postcode to begin"]',
);
postCodeInput.sendKeys('E1 6QR');

const deliveryButton = driver.activeWindow.getElementByTextContent(
  'DELIVERY',
  'button',
);

deliveryButton.mouse.click();

waitFor(() => {
  assert(
    driver.activeWindow.getUrl().startsWith('https://www.dominos.co.uk/menu'),
  );
});

const texasBBQWrapper = driver.activeWindow.getElement(
  '[ng-data-productid="17"]',
);
const addToBasketButton = texasBBQWrapper.getElementByTextContent(
  'Add To Basket',
  'button',
);
addToBasketButton.mouse.click();

driver.activeWindow.getElement('.nav-link-basket').mouse.click();

const price = driver.activeWindow
  .getElement('[data-ng-bind="vm.model.displayTotalPrice"]')
  .getText()
  .trim();
assert(price[0] === '£');
const priceValue = parseInt(price.substr(1), 10);
assert(priceValue < 25);
const checkoutButtons = driver.activeWindow.getElements(
  '.basket-buttons-checkout-now',
);
assert(
  checkoutButtons.some(button => {
    try {
      button.mouse.click();
      return true;
    } catch (ex) {
      return false;
    }
  }),
  'Checkout failed for all buttons',
);

driver.activeWindow.getElement('input[name="firstName"]').sendKeys('Forbes');
driver.activeWindow
  .getElement('input[name="contactNumber"]')
  .sendKeys('01234567891');
driver.activeWindow
  .getElement('input[name="emailAddress"]')
  .sendKeys('forbes@lindesay.co.uk');

const addressSelector = driver.activeWindow.getElement(
  'select[name="address"]',
);
addressSelector.getElements('option', SelectorTypes.TAG)[1].mouse.click();

const paymentMethodSelector = driver.activeWindow.getElement(
  'select[name="paymentMethod"]',
);
paymentMethodSelector
  .getElementByTextContent('Cash', 'option', SelectorTypes.TAG)
  .mouse.click();

// TODO: uncomment this line to actually order a pizza:
// driver.activeWindow.getElementByTextContent('Place Order and Pay').mouse.click();

driver.dispose();
