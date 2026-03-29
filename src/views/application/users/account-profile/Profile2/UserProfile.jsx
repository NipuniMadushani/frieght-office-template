// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import FormActionButtons from 'ui-component/extended/FormActionButtons';
import { gridSpacing } from 'store/constant';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project store & actions
import { useDispatch } from 'store';
import { useSaveProfileMutation } from 'api/userProfileApi';
import useAuth from 'hooks/useAuth'; // Optional but good for enterprise (context)

const validationSchema = yup.object({
  lastName: yup.string().required('Last Name is required'),
  firstName: yup.string().required('First Name is required'),
  emailAddress: yup.string().email('Enter a valid email').required('Email Address is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  companyName: yup.string().required('Company Name is required'),
  siteInformation: yup.string().required('Site Information is required')
});

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

export default function UserProfile() {
  const dispatch = useDispatch();
  // Using React Query's mutateAsync so we can await it cleanly
  const { mutateAsync: saveProfile } = useSaveProfileMutation();

  const formik = useFormik({
    initialValues: {
      lastName: 'Schorl',
      firstName: 'Delaney',
      emailAddress: 'demo@company.com',
      phoneNumber: '000-00-00000',
      companyName: 'company.ltd',
      siteInformation: 'www.company.com'
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        console.log('clicked');
        // Execute the React Query mutation to POST the data
        // React Query's global MutationCache instantly detects this and shows the Snackbar automatically!
        await saveProfile(values);
      } catch (error) {
        // Errors are also handled automatically at the global level now!
        console.error('Submission failed, but global alert was fired', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <Grid container sx={{ alignItems: 'center', gap: 2 }}>
            <Grid>
              <Avatar alt="User 1" src={Avatar1} sx={{ height: 80, width: 80 }} />
            </Grid>
            <Grid size={{ sm: 'grow' }}>
              <Grid container spacing={1}>
                <Grid size={12}>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                    <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple type="file" />
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Typography variant="caption">
                    <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                    Image size Limit should be 125kb Max.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            id="emailAddress"
            name="emailAddress"
            label="Email Address"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
            helperText={formik.touched.emailAddress && formik.errors.emailAddress}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            id="companyName"
            name="companyName"
            label="Company Name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            id="siteInformation"
            name="siteInformation"
            label="Site Information"
            value={formik.values.siteInformation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.siteInformation && Boolean(formik.errors.siteInformation)}
            helperText={formik.touched.siteInformation && formik.errors.siteInformation}
          />
        </Grid>
        <Grid size={12}>
          <FormActionButtons onCancel={formik.handleReset} isSubmitting={formik.isSubmitting} />
        </Grid>
      </Grid>
    </form>
  );
}
