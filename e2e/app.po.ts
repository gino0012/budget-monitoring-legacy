import { browser, element, by } from 'protractor';

export class BudgetMonitoringPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('app-root .brand-logo')).getText();
  }
}
