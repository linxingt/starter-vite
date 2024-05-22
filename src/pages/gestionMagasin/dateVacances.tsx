import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import TabPanel from './TabPanel';
import { useTheme } from '@mui/material/styles';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridValueGetterParams,
    GridValueSetterParams,
    GridRowSpacingParams
    // GridSlots,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        nom: "vacance 1",
        dateDebut: null,
        dateFin: null,
    },
    {
        id: randomId(),
        nom: "vacance 2",
        dateDebut: null,
        dateFin: null,
    },
    {
        id: randomId(),
        nom: "vacance 3",
        dateDebut: null,
        dateFin: null,
    },
    {
        id: randomId(),
        nom: "vacance 4",
        dateDebut: null,
        dateFin: null,
    },
    {
        id: randomId(),
        nom: "vacance 5",
        dateDebut: null,
        dateFin: null,
    },
];

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, nom: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nom' },
        }));
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
                alignSelf: 'center'
            }}
        >

            {/* <GridToolbarContainer> */}
            <Button color="primary" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleClick} variant="contained">
                Create
            </Button>
            {/* </GridToolbarContainer> */}
        </Box>
    );
}

export default function FullFeaturedCrudGrid() {
    const [value, setValue] = React.useState(2);
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const theme = useTheme();
    // console.log(dayjs().year(2023).endOf('year'))
    // console.log(dayjs().year(selectedYear).endOf('year'))
    // console.log(selectedYear)

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // const updateScrollButtons = () => {
    //     if (!tabsRef.current) return;

    //     const handleLeftClick = () => {
    //         setValue((prev) => Math.max(prev - 1, 0));
    //         if (tabsRef.current) {
    //             tabsRef.current.scrollTo(tabsRef.current.scrollLeft - 100, 0);
    //         }
    //     };

    //     const handleRightClick = () => {
    //         setValue((prev) => Math.min(prev + 1, years.length - 1));
    //         if (tabsRef.current) {
    //             tabsRef.current.scrollTo(tabsRef.current.scrollLeft + 100, 0);
    //         }
    //     };

    //     return {
    //         handleLeftClick,
    //         handleRightClick,
    //     };
    // };

    const columns: GridColDef[] = [
        { field: 'nom', headerName: 'Nom de vacances', flex: 1, minWidth: 150, editable: true, headerAlign: 'center', align: 'center' },
        {
            field: 'dateDebut',
            headerName: 'Date de debut',
            // type: 'date',
            flex: 1,
            minWidth: 180,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log(rows[params.row.id - 1].midi)
                return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={params.row.dateDebut}
                        onChange={(newValue) => {
                            const updatedRows = rows;
                            updatedRows[params.row.id - 1].dateDebut = newValue;
                            setRows(updatedRows);
                        }}
                        minDate={dayjs().year(selectedYear).startOf('year')}
                        maxDate={dayjs().year(selectedYear).endOf('year')}
                    />
                </LocalizationProvider>
            }
        },
        {
            field: 'dateFin',
            headerName: 'Date de fin',
            type: 'date',
            flex: 1,
            minWidth: 180,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log(rows[params.row.id - 1].midi)
                return <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={params.row.dateDebut}
                        onChange={(newValue) => {
                            const updatedRows = rows;
                            updatedRows[params.row.id - 1].dateDebut = newValue;
                            setRows(updatedRows);
                        }}
                        minDate={dayjs().year(selectedYear).startOf('year')}
                        maxDate={dayjs().year(selectedYear).endOf('year')}
                    />
                </LocalizationProvider>
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const years = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 2 + i);
console.log(value)
    return (
        <Box
            sx={{
                // height: 400,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                // marginBottom: 6,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                }}
            >
                <Typography variant="body1" >Precision des dates de vacances</Typography >
                {/* <Tabs
                    value={value}
                    onChange={(event: React.SyntheticEvent, newValue: number) => { setValue(newValue); setSelectedYear(years[newValue]) }}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    action={updateScrollButtons()}
                    sx={{
                        // flexGrow: 1,
                        maxWidth: { xs: 170, sm: 170 },
                        bgcolor: 'background.paper',
                        flexDirection: 'row',
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    {years.map((value, index, array) => (
                        <Tab label={value} {...a11yProps(index)} />
                    ))}
                </Tabs> */}
                <Select
                    native
                    value={selectedYear}
                    size="small"
                    variant="outlined"
                    onChange={(event: SelectChangeEvent) => { setValue(years.indexOf(Number(event.target.value)));setSelectedYear(event.target.value) }}
                >
                    {years.map((value, index, array) => (
                        <option value={value} {...a11yProps(index)} >{value}</option>
                    ))}
                </Select>
            </Box>
            {years.map((year, index, array) => (
                <TabPanel value={value} index={index} dir={theme.direction} >
                    <Box
                        sx={{
                            height: 395,
                            width: '100%',
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            getRowHeight={() => 'auto'}
                            slots={{
                                footer: EditToolbar,
                            }}
                            slotProps={{
                                footer: { setRows, setRowModesModel } as any,
                            }}
                            sx={{
                                '&, .MuiDataGrid': { border: 'none', borderBottom: '1px solid #E0E0E0', borderRadius: 0 },
                                '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                                '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
                            }}
                        />
                    </Box>
                </TabPanel>
            ))}


        </Box>
    );
}
