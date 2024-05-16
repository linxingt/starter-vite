import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props:TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index:number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function URLTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="body1" >URLS</Typography>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#2196F3",
            }
          }}
          sx={{
            backgroundColor: "#F5F5F5",
          }}
        >
          <Tab label="URL" {...a11yProps(0)} />
          <Tab label="Plateforme Livraison URL" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction} >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Google URL :
            <TextField id="googleUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Facebook URL :
            <TextField id="facebookUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Instagram URL :
            <TextField id="instagramUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Tiktok URL :
            <TextField id="tiktokUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Uber Eat URL :
            <TextField id="uberEatUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Delivero URL :
            <TextField id="deliveroUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            JustFat URL :
            <TextField id="justFatUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            Panda URL :
            <TextField id="pandaUrl" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
}
