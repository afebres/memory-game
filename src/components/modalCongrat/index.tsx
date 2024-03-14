import React from 'react'
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

type CongratulationsModalProps = {
  onClose: () => void
  userName: string
  result: string
  handleClose: () => void
  onPlayAgain: () => void
}

const CongratulationsModal = ({
  onClose,
  userName,
  result,
  handleClose,
  onPlayAgain,
}: CongratulationsModalProps) => {
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
    <Dialog open={true} onClose={() => onClose && onClose()}>
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

export default CongratulationsModal
