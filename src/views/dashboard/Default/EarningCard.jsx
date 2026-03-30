import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// third party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

export default function EarningCard({ 
  isLoading, 
  title = 'Total Earning', 
  value = '$500.00', 
  icon = EarningIcon, 
  path,
  color = 'secondary',
  trend = { label: 'higher', direction: 'up', value: '10%' },
  chartData
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    if (path) {
      navigate(path);
    }
  };

  const isUp = trend?.direction === 'up';
  const bgColor = color === 'primary' ? 'primary.dark' : 'secondary.dark';
  const lightColor = color === 'primary' ? 'primary.light' : 'secondary.200';
  const accentColor = color === 'primary' ? 'primary.800' : 'secondary.800';
  const darkColor = color === 'primary' ? 'primary.dark' : 'secondary.dark';

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
        >
          <MainCard
            border={false}
            content={false}
            onClick={handleCardClick}
            sx={{
              bgcolor: bgColor,
              ...theme.applyStyles('dark', { bgcolor: 'dark.dark' }),
              color: '#fff',
              overflow: 'hidden',
              position: 'relative',
              cursor: path ? 'pointer' : 'default',
              minHeight: 180,
              '&:after': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: theme.vars.palette[color][800],
                ...theme.applyStyles('dark', {
                  background: `linear-gradient(210.04deg, ${theme.vars.palette[color].dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                }),
                borderRadius: '50%',
                top: { xs: -85 },
                right: { xs: -95 }
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: theme.vars.palette[color][800],
                ...theme.applyStyles('dark', {
                  background: `linear-gradient(140.9deg, ${theme.vars.palette[color].dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                }),
                borderRadius: '50%',
                top: { xs: -125 },
                right: { xs: -15 },
                opacity: 0.5
              }
            }}
          >
            <Box sx={{ p: 2.25 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', zIndex: 1, position: 'relative' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.largeAvatar,
                    borderRadius: 2,
                    bgcolor: accentColor,
                    ...theme.applyStyles('dark', { bgcolor: 'dark.main' }),
                    mt: 1
                  }}
                >
                  {typeof icon === 'string' ? (
                     <CardMedia sx={{ width: 24, height: 24 }} component="img" src={icon} alt={title} />
                  ) : (
                     React.cloneElement(icon, { sx: { fontSize: '1.5rem', color: 'inherit' } })
                  )}
                </Avatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    bgcolor: darkColor,
                    ...theme.applyStyles('dark', { bgcolor: 'dark.dark' }),
                    color: lightColor,
                    zIndex: 1
                  }}
                  aria-controls="menu-earning-card"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreHorizIcon fontSize="inherit" />
                </Avatar>
              </Stack>
              
              <Grid container sx={{ position: 'relative', zIndex: 1 }}>
                <Grid size={chartData ? 7 : 12}>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{value}</Typography>
                    <Avatar sx={{ ...theme.typography.smallAvatar, bgcolor: lightColor, color: bgColor }}>
                      {isUp ? (
                         <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      ) : (
                         <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      )}
                    </Avatar>
                  </Stack>
                  <Typography
                    sx={{
                      mb: 1.25,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: lightColor,
                      ...theme.applyStyles('dark', { color: 'text.secondary' })
                    }}
                  >
                    {title}
                  </Typography>
                </Grid>
                {chartData && (
                  <Grid size={5} sx={{ mt: 1 }}>
                    <Chart {...chartData} />
                  </Grid>
                )}
              </Grid>
            </Box>
          </MainCard>
        </motion.div>
      )}
    </>
  );
}

EarningCard.propTypes = { 
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  path: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  trend: PropTypes.shape({
    label: PropTypes.string,
    direction: PropTypes.oneOf(['up', 'down']),
    value: PropTypes.string
  }),
  chartData: PropTypes.object
};



