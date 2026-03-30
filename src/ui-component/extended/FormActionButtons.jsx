import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

export default function FormActionButtons({
  onCancel,
  onSave,
  cancelText = 'CANCEL',
  saveText = 'SAVE',
  saveType = 'submit',
  cancelType = 'button',
  justifyContent = 'space-between',
  isSubmitting = false,
  saveWarningMsg = 'Are you sure to proceed this operation?',
  cancelWarningMsg = 'Are you sure you want to completely clear this form?',
  sx
}) {
  const theme = useTheme();

  // State to manage the Custom Warning Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null); // 'save' or 'cancel'

  // A hidden reference to trigger the native Formik submit
  const hiddenSubmitRef = useRef(null);

  const handleOpenDialog = (action) => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogAction(null);
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    if (dialogAction === 'save') {
      if (saveType === 'submit' && hiddenSubmitRef.current) {
        hiddenSubmitRef.current.click(); // Fires Formik's onSubmit!
      } else if (onSave) {
        onSave();
      }
    } else if (dialogAction === 'cancel' && onCancel) {
      onCancel();
    }
    setDialogAction(null);
  };

  const currentMsg = dialogAction === 'save' ? saveWarningMsg : cancelWarningMsg;

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent, mt: 2, ...sx }}>
        {/* Hidden button to natively trigger HTML <form> onSubmit while keeping the design clean */}
        {saveType === 'submit' && (
          <button type="submit" ref={hiddenSubmitRef} style={{ display: 'none' }} />
        )}

        <Button
          variant="contained"
          type="button" // Hijacked to prevent immediate native action!
          onClick={() => handleOpenDialog('cancel')}
          disabled={isSubmitting} // Disable during operations
          sx={{
            bgcolor: theme.palette.formAction.cancelBg,
            color: '#ffffff',
            borderRadius: '50px',
            px: 4,
            py: 1,
            fontWeight: 600,
            minWidth: 140,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: theme.palette.formAction.cancelHover,
              boxShadow: 'none'
            }
          }}
        >
          {cancelText}
        </Button>

        <Button
          variant="contained"
          type="button" // Hijacked to prevent immediate native action!
          onClick={() => handleOpenDialog('save')}
          disabled={isSubmitting}
          sx={{
            bgcolor: theme.palette.formAction.saveBg,
            color: theme.palette.formAction.saveColor,
            borderRadius: '50px',
            px: 4,
            py: 1,
            fontWeight: 600,
            minWidth: 140,
            boxShadow: 'none',
            opacity: isSubmitting ? 0.7 : 1,
            '&:hover': {
              bgcolor: theme.palette.formAction.saveHover,
              boxShadow: 'none'
            }
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : saveText}
        </Button>
      </Stack>

      {/* Global Customizable Warning Dialog exactly matching the requested design */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            p: 0, 
            bgcolor: theme.palette.warningDialog.bodyBg,
            color: theme.palette.warningDialog.bodyText,
            minWidth: { xs: '320px', sm: '480px' },
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }
        }}
      >
        <DialogTitle
          sx={{
            p: 2, 
            mt: 0, 
            bgcolor: theme.palette.warningDialog.headerBg,
            color: theme.palette.warningDialog.headerText,
            textAlign: 'center',
            fontWeight: '900',
            m: 0, 
            fontSize: '1.25rem',
            letterSpacing: '1.5px',
            borderBottom: 'none' 
          }}
        >
          WARNING
        </DialogTitle>
        <DialogContent sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mt: 2, mb: 1, color: theme.palette.warningDialog.bodyText, fontSize: '1.1rem', fontWeight: 600 }}>
            {currentMsg}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4, gap: 3 }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              bgcolor: theme.palette.warningDialog.cancelBg,
              color: theme.palette.warningDialog.cancelText,
              px: 6,
              py: 1.2,
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: '30px',
              minWidth: '120px',
              boxShadow: '0 4px 12px rgba(242, 77, 78, 0.3)',
              '&:hover': { bgcolor: theme.palette.warningDialog.cancelHover, boxShadow: '0 6px 16px rgba(242, 77, 78, 0.5)' }
            }}
          >
            NO
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              bgcolor: theme.palette.warningDialog.confirmBg,
              color: theme.palette.warningDialog.confirmText, 
              px: 6,
              py: 1.2,
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: '30px',
              minWidth: '120px',
              boxShadow: '0 4px 12px rgba(138, 196, 37, 0.3)',
              '&:hover': { bgcolor: theme.palette.warningDialog.confirmHover, boxShadow: '0 6px 16px rgba(138, 196, 37, 0.5)' }
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

FormActionButtons.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
  saveType: PropTypes.string,
  cancelType: PropTypes.string,
  justifyContent: PropTypes.string,
  isSubmitting: PropTypes.bool,
  saveWarningMsg: PropTypes.string,
  cancelWarningMsg: PropTypes.string,
  sx: PropTypes.object
};
