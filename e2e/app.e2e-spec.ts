import { BudgetMonitoringPage } from './app.po';

describe('budget-monitoring App', function() {
  let page: BudgetMonitoringPage;

  beforeEach(() => {
    page = new BudgetMonitoringPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Budget Monitoring App!');
  });
});
