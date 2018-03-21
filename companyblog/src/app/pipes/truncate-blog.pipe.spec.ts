import { TruncateBlogPipe } from './truncate-blog.pipe';

describe('TruncateBlogPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateBlogPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should truncate text that exceeds 51 charactes and add an ellipsis', () => {
    const pipe = new TruncateBlogPipe();

    const blogPost = "Hello World this is a fake blog post tha t should be truncated if this blogpost truncater is working correctly."
    expect(pipe.transform(blogPost)).toBe(blogPost.slice(0, 51) + '...');
  });
});
