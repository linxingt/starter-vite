import { Button, Divider, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup, TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
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
import Typography from '@mui/material/Typography';

export const FormTestMui = () => {
  const [siteIsOpen, setSiteIsOpen] = useState("true");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setSiteIsOpen(newAlignment);
  };

  return (
    // <Edit>
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 5 }}
    >

      <Button variant="contained" size="medium" sx={{ width: "10%", alignSelf: 'flex-end' }}>
        Save
      </Button>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 7, alignItems: "center" }}>
        <Typography variant="body1" >Ouverture du site</Typography >
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={siteIsOpen}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="true" >Ouvert</ToggleButton>
          <ToggleButton value="false" >Ferme</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <FullFeaturedCrudGrid></FullFeaturedCrudGrid>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="body1" >Annonce pour des vacances</Typography >
        <TextField id="annonceVancances" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Typography variant="body1" >Horaires de livraison</Typography >
        <RadioGroup
          row
          sx={{gap:5}}
        >
          <FormControlLabel value="midi" control={<Radio size="small" />} label="Midi" />
          <FormControlLabel value="soir" control={<Radio size="small" />} label="Soir" />
          <FormControlLabel value="midiSoir" control={<Radio size="small" />} label="Midi et Soir" />
        </RadioGroup>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 7, alignItems: "center" }}>
        <Typography variant="body1" >Gestion d'annonce</Typography >
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={siteIsOpen}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="true" >Ouvert</ToggleButton>
          <ToggleButton value="false" >Ferme</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ListAnnonce></ListAnnonce>

      <URLTabs></URLTabs>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="body1" >Balise meta titre</Typography >
        <TextField id="annonceVancances" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="body1" >Commentaire Accueil</Typography >
        <TextField id="annonceVancances" variant="outlined" size="small" fullWidth sx={{ width: "70%" }} multiline minRows={3} />
      </Box>

    </Box>
    // </Edit>
  );
};

