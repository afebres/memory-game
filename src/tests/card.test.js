import React from 'react'
import { render } from '@testing-library/react'
import Card from '../components/card'

describe('Card Component', () => {
  const mockHandleClick = jest.fn()
  const item = {
    uuid: '123',
    image: 'https://example.com/image.jpg',
    name: 'Test Card',
    flipped: false,
  }

  test('renders card with flipped class when flipped is true', () => {
    const { container } = render(
      <Card
        item={{ ...item, flipped: true }}
        index={0}
        handleClick={mockHandleClick}
      />
    )
    const cardElement = container.querySelector('.card')

    expect(cardElement).toHaveClass('active')
  })
})
