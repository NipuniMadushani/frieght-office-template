import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';

// assets
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const dashboardTiles = [
    {
      title: 'Total Customers',
      value: '2,450',
      icon: <PeopleAltOutlinedIcon />,
      path: '/apps/user/account-profile/all-customers'
    },
    {
      title: 'Total Orders',
      value: '1,203',
      icon: <ShoppingCartOutlinedIcon />,
      path: '/apps/customer/order-list'
    },
    {
      title: 'Total Invoices',
      value: '840',
      icon: <ReceiptOutlinedIcon />,
      path: '/apps/invoice/invoice-list'
    },
    {
      title: 'Messages',
      value: '14 New',
      icon: <ChatOutlinedIcon />,
      path: '/apps/chat'
    },
    {
      title: 'Emails',
      value: '5 Unread',
      icon: <EmailOutlinedIcon />,
      path: '/apps/mail'
    },
    {
      title: 'Calendar',
      value: '3 Events',
      icon: <CalendarTodayOutlinedIcon />,
      path: '/apps/calendar'
    },
    {
      title: 'Form Reports',
      value: '128 total',
      icon: <DescriptionOutlinedIcon />,
      path: '/forms/layouts/layouts'
    },
    {
      title: 'Analytics',
      value: 'View Stats',
      icon: <EqualizerOutlinedIcon />,
      path: '/dashboard/analytics'
    },
    {
      title: 'System Settings',
      value: 'Active',
      icon: <SettingsOutlinedIcon />,
      path: '/sample-page'
    }
  ];

  return (
    <Grid container spacing={gridSpacing}>
      {dashboardTiles.map((tile, index) => (
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={index}>
          <EarningCard
            isLoading={isLoading}
            title={tile.title}
            value={tile.value}
            icon={tile.icon}
            path={tile.path}
          />
        </Grid>
      ))}
    </Grid>
  );
}

