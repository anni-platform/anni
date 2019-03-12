import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import ImageCollection from '.';

describe('ImageCollection', () => {
  it('renders an empty state', () => {
    const { getByText } = render(<ImageCollection defaultCollection={[]} />);

    expect(getByText(/No images/)).toBeInTheDocument();
    expect(getByText(/Upload image/)).toBeInTheDocument();
  });

  it('provides a means to upload an image file', () => {
    const { getByLabelText, container } = render(
      <ImageCollection defaultCollection={[]} />
    );
    const inputEl = getByLabelText(/Upload image/i);

    const file = new File(['🐈'], 'cat.png', {
      type: 'image/png',
    });

    fireEvent.change(inputEl, { target: { files: [file] } });

    expect(container).toContainElement(
      container.querySelector('img[alt="cat.png"]')
    );
  });
});
