import { Edit } from "@refinedev/mui";
import { Typography } from "@mui/material";

const TestForTech = () => {
  return (
    <Edit
      title={<Typography variant="h5">Custom Title</Typography>}
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};