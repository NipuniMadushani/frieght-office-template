import { QueryClient, MutationCache } from '@tanstack/react-query';
import { store } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

/**
 *  Global Query Client Configuration 
 * This instantiates and configures TanStack Query for the entire application.
 * It features a global mutation cache that intercepts every request (onSuccess/onError)
 * and automatically dispatches stylized Snackbar notification alerts.
 */

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      // You can skip global alert by passing { meta: { showSnackbar: false } } in useMutation
      if (mutation.meta?.showSnackbar !== false) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: mutation.meta?.successMessage || 'Data saved successfully.',
            variant: 'alert',
            alert: { variant: 'filled', color: 'warningDialog.confirmBg' },
            severity: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            transition: 'SlideLeft',
            close: true
          })
        );
      }
    },
    onError: (error, variables, context, mutation) => {
      store.dispatch(
        openSnackbar({
          open: true,
          // Pull exact error from Spring Boot, fallback to custom dev meta, fallback to exact generic UI string
          message: error?.response?.data?.message || mutation.meta?.errorMessage || 'Failed to save data. Please try again.',
          variant: 'alert',
          alert: { variant: 'filled', color: 'warningDialog.cancelBg' },
          severity: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          transition: 'SlideLeft',
          close: true
        })
      );
    }
  })
});

export default queryClient;
