import puppeteer from 'puppeteer';
import { mockData } from '../mock-data';

describe('show/hide an event details', () => {
  let browser, page;
  jest.setTimeout(30000);
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow actions by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(async () => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.Event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.details-button');
    const eventDetails = await page.$('.Event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.details-button');
    const eventDetails = await page.$('.Event .details');
    expect(eventDetails).toBeNull();
  });

  describe('filter events by city', () => {
    let browser, page;
    jest.setTimeout(30000);
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow actions by 250ms
        ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
      });
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.CitySearch');
      await page.waitForSelector('.EventList');
    });

    afterAll(async () => {
      browser.close();
    });

    test('When user hasn’t searched for specific city, show upcoming events from all cities', async () => {
      let allEventsShown = await page.$$eval(
        '.Event',
        (element) => element.length
      );
      let mockDataLength = mockData.length;
      expect(allEventsShown).toEqual(mockDataLength);
      const suggestions = await page.$('.city .suggestions');
      expect(suggestions).toBeNull();
    });

    test('user should see a list of suggestions when they search for city', async () => {
      await page.type('.city', 'Berlin');

      const suggestions = await page.$$('.suggestions li');
      let suggestionLength = await page.$$eval(
        '.suggestions li',
        (element) => element.length
      );
      expect(suggestionLength).toEqual(2);
      expect(suggestions).toBeDefined();
    });

    test('User can select a city from the suggested list and see events in specified city', async () => {
      await page.click('.suggestions li');
      let locationElement = await page.$('.Event .location');
      let locationValue = await locationElement.evaluate(
        (el) => el.textContent
      );
      expect(locationValue).toContain('Berlin');
    });
  });
});
