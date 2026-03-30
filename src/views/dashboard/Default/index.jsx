import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import FeatureTileCard from 'ui-component/cards/FeatureTileCard';
import { gridSpacing } from 'store/constant';

// assets
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const featureTiles = [
    {
      title: 'Gate Movement',
      subTitle: 'Truck entering gate',
      icon: <LocalShippingOutlinedIcon />,
      path: '/apps/user/account-profile/all-customers',
       color: 'primary'
    },
    {
      title: 'Depot Operations',
      subTitle: 'Container yard',
      icon: <WarehouseOutlinedIcon />,
      path: '/apps/customer/order-list',
       color: 'primary'
    },
    {
      title: 'CFS Operation',
      subTitle: 'Container freight station',
      icon: <ViewQuiltOutlinedIcon />,
      path: '/apps/invoice/invoice-list',
       color: 'primary'
    },
    {
      title: 'Repair Operations',
      subTitle: 'Container repair tools',
      icon: <BuildOutlinedIcon />,
      path: '/apps/chat',
       color: 'primary'
    },
    {
      title: 'Container Rental',
      subTitle: 'Container rental agreement',
      icon: <DescriptionOutlinedIcon />,
      path: '/apps/mail',
       color: 'primary'
    },
    {
      title: 'Finance',
      subTitle: 'Financial chart or invoice',
      icon: <AccountBalanceWalletOutlinedIcon />,
      path: '/apps/calendar',
       color: 'primary'
    },
    {
      title: 'System Configuration',
      subTitle: 'System settings and administration',
      icon: <SettingsOutlinedIcon />,
      path: '/forms/layouts/layouts',
       color: 'primary'
    },
    {
      title: 'Organization Setup',
      subTitle: 'Configure companies, segments, and locations',
      icon: <BusinessOutlinedIcon />,
      path: '/dashboard/analytics',
       color: 'primary'
    },
    {
      title: 'Reports and Analysis',
      subTitle: 'Business intelligent reports',
      icon: <AssessmentOutlinedIcon />,
      path: '/sample-page',
       color: 'primary'
    }
  ];

  return (
    <Grid container spacing={gridSpacing}>
      {/* <Grid size={12}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          System Portal
        </Typography>
      </Grid> */}
      {featureTiles.map((tile, index) => (
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={index}>
          <FeatureTileCard
            isLoading={isLoading}
            title={tile.title}
            subTitle={tile.subTitle}
            icon={tile.icon}
            path={tile.path}
            color={tile.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}



