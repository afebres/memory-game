import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'


/**
 * Properties Modal Component.
 * @typedef {Object} CongratulationsModalProps
 * @property {() => void} onNameUpdate - Function to update the user's name
 * @property  {boolean} isOpen - Flag to determine if the modal is open
 */

type ModalFormProps = {
  onNameUpdate: (newName: string) => void
  isOpen: boolean
}

/**
 * modal form to enter the  user's name
 *
 * @param {ModalFormProps} props - Props for the ModalForm component
 * @returns {JSX.Element} - JSX element representing the ModalForm component
 */

export const ModalForm: React.FC<ModalFormProps> = ({
  onNameUpdate,
  isOpen,
}: ModalFormProps): JSX.Element => {
  const { t } = useTranslation()

  const [name, setName] = useState('')

  /**
   * Handles the close the modal
   */
  const handleClose = () => {
    onNameUpdate(name)
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{`${t('ENTER_YOUR_NAME')}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='name'
            type='text'
            fullWidth
            variant='standard'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className='button primary' onClick={handleClose}>{`${t(
            'SUBMIT'
          )}`}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
