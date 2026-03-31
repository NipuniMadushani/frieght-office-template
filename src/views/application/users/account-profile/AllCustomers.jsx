import React from 'react';
import { useGetAllProfilesQuery } from 'api/userProfileApi';

// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
// MUI X Community (Using latest Grid Hooks to avoid deprecated components)
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, useGridApiContext } from '@mui/x-data-grid';

// icons
import { Edit, Visibility, Add, ViewColumn, FilterList, FileDownload } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| MODERN CUSTOM TOOLBAR (Non-Deprecated Hook-based) ||============================== //

function CustomToolbar() {
  const apiRef = useGridApiContext();

  return (
    <GridToolbarContainer sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center' }}>
      <GridToolbarQuickFilter
        placeholder="Search Directory..."
        sx={{
          bgcolor: 'background.paper',
          p: 0.5,
          borderRadius: 2,
          mr: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
            display: 'none'
          }
        }}
      />

      <Button
        size="small"
        variant="text"
        startIcon={<ViewColumn />}
        onClick={() => apiRef.current.showColumnMenu('firstName')}
        sx={{ color: 'text.secondary', textTransform: 'none' }}
      >
        Columns
      </Button>

      <Button
        size="small"
        variant="text"
        startIcon={<FilterList />}
        onClick={() => apiRef.current.showFilterPanel()}
        sx={{ color: 'text.secondary', textTransform: 'none' }}
      >
        Filters
      </Button>

      <Button
        size="small"
        variant="text"
        startIcon={<FileDownload />}
        onClick={() => apiRef.current.exportDataAsCsv()}
        sx={{ color: 'text.secondary', textTransform: 'none' }}
      >
        Export
      </Button>

      <Button
        variant="contained"
        size="small"
        color="success"
        startIcon={<Add />}
        sx={{
          borderRadius: 1.5,
          boxShadow: 'none',
          textTransform: 'none',
          px: 2,
          '&:hover': { boxShadow: 'none', bgcolor: 'success.dark' }
        }}
      >
        Add
      </Button>
    </GridToolbarContainer>
  );
}

// ==============================|| ALL CUSTOMERS DIRECTORY ||============================== //

export default function AllCustomers() {
  const theme = useTheme();
  const { data: profiles, isLoading, isError } = useGetAllProfilesQuery();

  if (isLoading) {
    return (
      <MainCard title="Customer Directory">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  if (isError) {
    return (
      <MainCard title="Customer Directory">
        <Alert severity="error">Failed to load customers from server.</Alert>
      </MainCard>
    );
  }

  const rows = (profiles || []).map((profile, index) => ({
    id: profile.userId || index,
    status: true,
    ...profile
  }));

  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      flex: 1.5,
      minWidth: 200,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <Switch checked={params.value} color="success" size="small" />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} justifyContent="center" width="100%">
          <Tooltip title="Edit Profile">
            <IconButton color="primary" size="small" onClick={() => console.log('Edit:', params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  return (
    <MainCard content={false} title="Customer Directory">
      <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.01) }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <AnimateButton type="slide">
            {' '}
            <Button variant="contained" startIcon={<AddIcon />}>
              Add New
            </Button>{' '}
          </AnimateButton>
        </Box>
        <Card
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
            overflow: 'hidden'
          }}
        >
          <Box>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              // slots={{ toolbar: CustomToolbar }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 15 }
                }
              }}
              pageSizeOptions={[15, 25, 50]}
              showToolbar
            />
          </Box>
        </Card>
      </Box>
    </MainCard>
  );
}
