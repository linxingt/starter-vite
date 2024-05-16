import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GridColDef, DataGrid,GridRowSpacingParams } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { alignProperty } from '@mui/material/styles/cssUtils';


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function HorairesBou() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const [rows, setRows] = React.useState([
        {
            id: 1,
            dayName: "lundi",
            midi: null,
            soir: null
        },
        {
            id: 2,
            dayName: "mardi",
            midi: null,
            soir: null
        },
        {
            id: 3,
            dayName: "mercredi",
            midi: null,
            soir: null
        },
        {
            id: 4,
            dayName: "jeudi",
            midi: null,
            soir: null
        },
        {
            id: 5,
            dayName: "vendredi",
            midi: null,
            soir: null
        },
        {
            id: 6,
            dayName: "samedi",
            midi: null,
            soir: null
        },
        {
            id: 7,
            dayName: "dimanche",
            midi: null,
            soir: null
        },
    ]);

    const columns: GridColDef[] = [
        { field: 'dayName', headerName: '', width: 90, sortable: false },
        {
            field: 'midi',
            headerName: 'Midi',
            type: 'time',
            width: 180,
            headerAlign: 'center',
            sortable: false,
            renderCell: (params) => {
                // console.log(rows[params.row.id - 1].midi)
                return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        value={rows[params.row.id - 1].midi}
                        onChange={(newValue) => {
                            const updatedRows = rows;
                            updatedRows[params.row.id - 1].midi = newValue;
                            setRows(updatedRows);
                        }}
                    // slotProps={{ textField: { variant: "standard" } }}
                    />
                </LocalizationProvider>
            }
        },
        {
            field: 'soir',
            headerName: 'Soir',
            type: 'time',
            width: 180,
            headerAlign: 'center',
            sortable: false,
            renderCell: (params) => {
                // console.log(rows[params.row.id - 1].midi)
                return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        value={rows[params.row.id - 1].soir}
                        onChange={(newValue) => {
                            const updatedRows = rows;
                            updatedRows[params.row.id - 1].soir = newValue;
                            setRows(updatedRows);
                        }}
                    />
                </LocalizationProvider>
            }
        },
    ];


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index: number) => {
        setValue(index);
      };

      const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
        return {
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        };
      }, []);

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Typography variant="body1" >Horaire d’ouverture</Typography>
            <AppBar position="static" >
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
                    <Tab label="sur place" {...a11yProps(0)} />
                    <Tab label="emporter" {...a11yProps(1)} />
                    <Tab label="livraison" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction} >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <DataGrid rows={rows} columns={columns} hideFooter disableColumnMenu getRowHeight={() => 'auto'} getRowSpacing={getRowSpacing}
                        sx={{
                            '&, [class^=MuiDataGrid]': { border: 'none' },
                            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                            '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
                            '& .MuiDataGrid-columnSeparator': { display: 'none' }
                        }} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 9 }}>
                        <Button variant="outlined" size="small" sx={{ '&, .MuiButton-sizeSmall': { fontSize: 9 } }}>tous en meme temps</Button>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <DataGrid rows={rows} columns={columns} hideFooter disableColumnMenu getRowHeight={() => 'auto'} getRowSpacing={getRowSpacing}
                        sx={{
                            '&, [class^=MuiDataGrid]': { border: 'none' },
                            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                            '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
                            '& .MuiDataGrid-columnSeparator': { display: 'none' }
                        }} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 1 }}>
                        <Button variant="outlined" size="small" sx={{ '&, .MuiButton-sizeSmall': { fontSize: 9 } }}>copy from sur place</Button>
                        <Button variant="outlined" size="small" sx={{ '&, .MuiButton-sizeSmall': { fontSize: 9 } }}>tous en meme temps</Button>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <DataGrid rows={rows} columns={columns} hideFooter disableColumnMenu getRowHeight={() => 'auto'} getRowSpacing={getRowSpacing}
                        sx={{
                            '&, [class^=MuiDataGrid]': { border: 'none' },
                            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                            '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
                            '& .MuiDataGrid-columnSeparator': { display: 'none' }
                        }} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 1 }}>
                        <Button variant="outlined" size="small" sx={{ '&, .MuiButton-sizeSmall': { fontSize: 9 } }}>copy from sur place</Button>
                        <Button variant="outlined" size="small" sx={{ '&, .MuiButton-sizeSmall': { fontSize: 9 } }}>tous en meme temps</Button>
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    );
}


