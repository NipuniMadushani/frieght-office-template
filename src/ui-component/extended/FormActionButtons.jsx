// Vite Cache Invalidation: 1
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function FormActionButtons({
  onCancel,
  onSave,
  cancelText = 'CANCEL',
  saveText = 'SAVE',
  saveType = 'submit',
  cancelType = 'button',
  justifyContent = 'space-between',
  isSubmitting = false,
  sx
}) {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent, mt: 2, ...sx }}>
      <Button
        variant="contained"
        type={cancelType}
        onClick={onCancel}
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
        type={saveType}
        onClick={onSave}
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
  sx: PropTypes.object
};
