import React from 'react';
import { useGetAllProfilesQuery } from 'api/userProfileApi';

// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// material-table icons
import { Edit, DeleteOutline } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| ALL CUSTOMERS PROFILE ||============================== //

export default function AllCustomers() {
  const { data: profiles, isLoading, isError } = useGetAllProfilesQuery();

  if (isLoading) {
    return (
      <MainCard title="All Customers">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  if (isError) {
    return (
      <MainCard title="All Customers">
        <Alert severity="error">Failed to load customers from server.</Alert>
      </MainCard>
    );
  }

  // Ensure every row has a unique id for DataGrid
  const rows = (profiles || []).map((profile, index) => ({
    id: profile.userId || index,
    ...profile
  }));

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
    { field: 'emailAddress', headerName: 'Email Address', flex: 1.5, minWidth: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150 },
    { field: 'companyName', headerName: 'Company', flex: 1, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <React.Fragment>
          <Tooltip title="Edit Profile">
            <IconButton color="primary" onClick={() => console.log('Edit Profile:', params.row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Profile">
            <IconButton color="error" onClick={() => console.log('Delete Profile:', params.row)}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  return (
    <MainCard content={false} title="Customer Directory">
      <Box sx={{ height: 600, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }
            }
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </MainCard>
  );
}
