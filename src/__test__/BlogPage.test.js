// BlogPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogPage from './BlogPage';
import blogPosts from './data.json';

jest.mock('./CommentSection', () => {
  return function MockCommentSection() {
    return <div>Comment Section</div>;
  };
});

describe('BlogPage Component', () => {
  test('renders blog post based on URL parameter', () => {
    const testId = 1;
    render(
      <MemoryRouter initialEntries={[`/blog/${testId}`]}>
        <BlogPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: blogPosts[testId-1].title })).toBeInTheDocument();
    expect(screen.getByAltText('Blog Post')).toHaveAttribute('src', blogPosts[testId-1].image);
    expect(screen.getByText(blogPosts[testId-1].description)).toBeInTheDocument();
    expect(screen.getByText('Comment Section')).toBeInTheDocument();
  });
}); 
