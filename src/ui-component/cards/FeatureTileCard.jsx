import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// ==============================|| FEATURE TILE CARD ||============================== //

const FeatureTileCard = ({ isLoading, title, subTitle, icon, path, color = 'primary' }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (path) {
      navigate(path);
    }
  };

  const bgColor = color === 'primary' ? '#003577' : theme.vars.palette.secondary.dark;
  const hoverColor = color === 'primary' ? '#30b2eb' : theme.vars.palette.secondary.main;

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover="hover"
        >
          <MainCard
            border={false}
            content={false}
            onClick={handleCardClick}
            sx={{
              bgcolor: bgColor,
              color: '#fff',
              overflow: 'hidden',
              position: 'relative',
              cursor: path ? 'pointer' : 'default',
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: theme.shadows[3],
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: hoverColor,
                boxShadow: theme.shadows[10]
              }
            }}
          >
            <Box sx={{ p: 2.5, position: 'relative', zIndex: 2 }}>
              <Stack spacing={1}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'visible'
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    variants={{
                      hover: { rotate: 360 }
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {React.cloneElement(icon, { sx: { fontSize: '1.4rem' } })}
                  </motion.div>
                </Avatar>
                <Box>
                  <motion.div
                    variants={{
                      hover: { x: 5 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600, mb: 0.5 }}>
                      {title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.75)', display: 'block' }}>
                      {subTitle}
                    </Typography>
                  </motion.div>
                </Box>
              </Stack>
            </Box>

            {/* Background Watermark Icon */}
            <Box
              sx={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                opacity: 0.1,
                color: '#fff',
                zIndex: 1
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [-10, -5, -10]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                variants={{
                  hover: { 
                    rotate: -20, 
                    scale: 1.3,
                    opacity: 0.2
                  }
                }}
                initial={{ rotate: -10 }}
              >
                {React.cloneElement(icon, { sx: { fontSize: '120px' } })}
              </motion.div>
            </Box>
          </MainCard>
        </motion.div>
      )}
    </>
  );
};



FeatureTileCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.node,
  path: PropTypes.string,
  color: PropTypes.string
};

export default FeatureTileCard;
