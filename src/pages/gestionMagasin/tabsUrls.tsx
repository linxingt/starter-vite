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
import TabPanel from './TabPanel';

function a11yProps(index: number) {
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
      <Box sx={{ border: 1, borderColor: "#C4C4C4" }}>
        <TabPanel value={value} index={0} dir={theme.direction} >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Google URL :
              <TextField id="googleUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Facebook URL :
              <TextField id="facebookUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Instagram URL :
              <TextField id="instagramUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Tiktok URL :
              <TextField id="tiktokUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Uber Eat URL :
              <TextField id="uberEatUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Delivero URL :
              <TextField id="deliveroUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              JustFat URL :
              <TextField id="justFatUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "5%" }}>
              Panda URL :
              <TextField id="pandaUrl" variant="outlined" size="small" fullWidth sx={{ width: "80%" }} />
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}
