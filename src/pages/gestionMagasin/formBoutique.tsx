import * as React from 'react';
import { Button, Divider, FormControl, InputLabel, MenuItem, ToggleButton, ToggleButtonGroup, TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import SpeedDial from '@mui/material/SpeedDial';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useAutocomplete, SaveButton, Edit } from "@refinedev/mui";
import { useState } from "react";
import FullFeaturedCrudGrid from "./dateVacances";
import ListAnnonce from "./listAnnonce";
import URLTabs from "./tabsUrls";
import HorairesBou from "./horaireBoutique";
import NumberInputBasic from "./numberInputMui";
import DateNonReservable from "./dateNonReser";
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';

export const FormTestMuiBoutique = () => {

  const types = [
    { value: 'jap', label: 'japonais ' },
    { value: 'kor', label: 'coréen ' },
    { value: 'chn', label: 'chinois ' },
    { value: 'mex', label: 'mexicain ' },
    { value: 'ita', label: 'italien ' },
  ];
  const [type, setType] = React.useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    // <Edit>
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, marginLeft: "1%", marginRight: "5%" }}
    >

      <Box sx={{ position: "fixed", top: 55, height: 60, bgcolor: "white", display: "flex", flexDirection: "row", width: "100%", zIndex: 10, paddingLeft: "75%", paddingTop: 2, paddingBottom: 1 }}>
        <Button variant="contained" size="medium" sx={{ width: "10%" }}>
          Save
        </Button>
      </Box>

      <Box sx={{ height: 50 }}></Box>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "40%" }}>
          <Typography variant="body1" >Nom de boutique</Typography>
          <TextField id="annonceVancances" variant="outlined" size="small" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "40%" }}>
          <Typography variant="body1" >Type de boutique</Typography>
          <Select
            native
            defaultValue={'jap'}
            variant="outlined"
            size="small"
            inputProps={{
              name: 'type',
              id: 'uncontrolled-native',
            }}
          >
            {types.map((option) => (
              <option value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "40%" }}>
          <Typography variant="body1" >Adresse</Typography>
          <TextField id="annonceVancances" variant="outlined" size="small" multiline minRows={3} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "40%" }}>
          <Typography variant="body1" >Geocode</Typography>
          <TextField id="annonceVancances" variant="outlined" size="small" multiline minRows={3} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "40%" }}>
          <Typography variant="body1" >Courriel</Typography>
          <TextField id="annonceVancances" variant="outlined" size="small" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "40%" }}>
          <Typography variant="body1" >Telephone</Typography>
          <TextField id="annonceVancances" variant="outlined" size="small" />
        </Box>
      </Box>

      <HorairesBou></HorairesBou>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, width: "80%", justifyContent: 'space-between' }}>
        <Typography variant="body1" >Delais a emporter</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <NumberInputBasic />
          <Typography variant="body1" >minutes</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, width: "80%", justifyContent: 'space-between' }}>
        <Typography variant="body1" >Delais a livraison</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <NumberInputBasic />
          <Typography variant="body1" >minutes</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, width: "80%", justifyContent: 'space-between' }}>
        <Typography variant="body1" >intervalle de temps</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <NumberInputBasic />
          <Typography variant="body1" >minutes</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
        <Typography variant="body1" >Affichage des que possible</Typography >
        <RadioGroup
          row
        >
          <FormControlLabel value="oui" control={<Radio size="small" />} label="Oui" />
          <FormControlLabel value="non" control={<Radio size="small" />} label="Non" />
        </RadioGroup>
      </Box>

      <DateNonReservable></DateNonReservable>
      {/* select au lieu tabs 2024 */}

    </Box>
    // </Edit>
  );
};

