import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ResultModal } from '../components/modalResult'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}))

describe('ResultModal Component', () => {
  const mockHandleClose = jest.fn()
  const mockHandlePlayAgain = jest.fn()
  const props = {
    userName: 'User',
    result: 'win',
    handleClose: mockHandleClose,
    onPlayAgain: mockHandlePlayAgain,
  }

  test('calls handlePlayAgain function when play again button is clicked', () => {
    const { getByText } = render(<ResultModal {...props} />)

    const playAgainButton = getByText('PLAY_AGAIN')

    fireEvent.click(playAgainButton)

    expect(mockHandlePlayAgain).toHaveBeenCalled()
  })
})
