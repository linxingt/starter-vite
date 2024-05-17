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
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
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
    // GridSlots,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import RichTextEditorModal from './richText';
import { Content } from 'antd/es/layout/layout';

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        nom: "annonce 1",
        contenu: randomTraderName(),
    },
    {
        id: randomId(),
        nom: "annonce 2",
        contenu: randomTraderName(),
    },
    {
        id: randomId(),
        nom: "annonce 3",
        contenu: randomTraderName(),
    },
    {
        id: randomId(),
        nom: "annonce 4",
        contenu: randomTraderName(),
    },
    {
        id: randomId(),
        nom: "annonce 5",
        contenu: randomTraderName(),
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
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
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

export default function ListAnnonce() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [editorOpen, setEditorOpen] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState<any>(null);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        const row = rows.find((row) => row.id === id);
        setCurrentRow(row);
        setEditorOpen(true);
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

    const columns: GridColDef[] = [
        { field: 'nom', headerName: 'Nom de annonce', flex: 1, minWidth: 180, editable: true, headerAlign: 'center', align: 'center' },
        { field: 'contenu', headerName: 'Contenue', flex: 1, minWidth: 180, editable: true, headerAlign: 'center', align: 'center' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            align: 'center',
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

    return (
        <Box
            sx={{
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                // gap:2,
                // flexDirection:'column',
                // display:'flex'
            }}
        >
            <Typography variant="body1" >List d'annonce</Typography>
            <Box sx={{ height: 370 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        // toolbar: EditToolbar,
                        footer: EditToolbar,
                    }}
                    slotProps={{
                        // toolbar: { setRows, setRowModesModel },
                        footer: { setRows, setRowModesModel } as any,
                        // 疑问
                    }}
                    sx={{
                        '&, .MuiDataGrid': { border: 'none', borderBottom: '1px solid #E0E0E0', borderRadius: 0 },
                        '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
                    }}
                />
            </Box>
            <RichTextEditorModal
                open={editorOpen}
                onClose={() => setEditorOpen(false)}
                initialContent={currentRow?.contenu || ''}
                onSave={(content: string) => {
                    if (currentRow) {
                        const updatedRow = { ...currentRow, contenu: content };
                        setRows(rows.map((row) => (row.id === currentRow.id ? updatedRow : row)));
                    }
                }}
            />
        </Box>
    );
}
