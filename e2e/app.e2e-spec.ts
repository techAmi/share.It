import { ShareItPage } from './app.po';

describe('share-it App', () => {
  let page: ShareItPage;

  beforeEach(() => {
    page = new ShareItPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
