import { BudgetMonitoringPage } from './app.po';

describe('budget-monitoring App', function() {
  let page: BudgetMonitoringPage;

  beforeEach(() => {
    page = new BudgetMonitoringPage();
  });

  it('should have correct title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Budget Monitoring');
  });
});
