import { TruncateBlogPipe } from './truncate-blog.pipe';

describe('TruncateBlogPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateBlogPipe();
    expect(pipe).toBeTruthy();
  });
});
