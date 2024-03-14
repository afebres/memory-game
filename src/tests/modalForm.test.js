import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalForm } from '../components/modalForm'
import { useTranslation } from 'react-i18next'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}))

describe('ModalForm Component', () => {
  const mockOnNameUpdate = jest.fn()
  const props = {
    onNameUpdate: mockOnNameUpdate,
    isOpen: true,
  }

  test('renders modal with submit button', () => {
    const { getByText } = render(<ModalForm {...props} />)
    const submitButton = getByText('SUBMIT')

    fireEvent.click(submitButton)
  })
})
