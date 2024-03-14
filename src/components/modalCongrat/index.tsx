import React from 'react'
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
/**
 * Properties for the ResultModal component.
 * @typedef {Object} ResultModalProps
 * @property {string} userName - User's name.
 * @property {string} result - Game result ('win', 'lose', 'draw').
 * @property {() => void} handleClose - Function to handle modal close.
 * @property {() => void} onPlayAgain - Function to restart the game.
 */

type ResultModalProps = {
  userName: string
  result: string
  handleClose: () => void
  onPlayAgain: () => void
}

/**
 * Modal component to display the game's result.
 * @param {ResultModalProps} props - Props for the result Modal component.
 * @returns {JSX.Element} Element representing the result modal.
 */
export const ResultModal = ({
  userName,
  result,
  handleClose,
  onPlayAgain,
}: ResultModalProps): JSX.Element => {
  const { t } = useTranslation()
  let message

  switch (result) {
    case 'win':
      message = t('WIN', { userName })
      break
    case 'lose':
      message = t('LOSE', { userName })
      break
    case 'draw':
      message = t('DRAW', { userName })
      break
    default:
      message = t('HELLO', { userName })
  }

  return (
    <Dialog open={true}>
      <DialogContent>{message}</DialogContent>
      <DialogActions className='space-bd-flex justify-content-between'>
        <Button className='button secondary' onClick={handleClose}>
          {t('CLOSE')}
        </Button>
        <Button className='button primary' onClick={onPlayAgain}>
          {t('PLAY_AGAIN')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
