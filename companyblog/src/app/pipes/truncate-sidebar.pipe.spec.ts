import { TruncateSidebarPipe } from './truncate-sidebar.pipe';

describe('TruncateSidebarPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateSidebarPipe();
    expect(pipe).toBeTruthy();
  });

  it('should truncate the sidebar text appropriately', () => {
    const pipe = new TruncateSidebarPipe();

    const title = 'This should truncate and add an ellipsis to any text that is over 25 characters long.';

    expect(pipe.transform(title)).toBe(title.slice(0, 26) + '...');
  });
});
