import React, { useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
// import MarkButtons from "./MarkButtons";
import SwipeableEdgeDrawer from "./Drawer";

const SidePanel = ({ setMarkerType, handleSendData ,isSendDataDisabled }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);



  return (
<>
      {isSmallScreen && (
        <SwipeableEdgeDrawer component={ <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            p: 2,
          }}
        >

          <Button
            variant="outlined"
            sx={{ mb: 1, bgcolor: "black", color: "white" }}
            onClick={() => {
              setMarkerType("red");

            }}
          >
            📍 Set the Red mark
          </Button>
          <Button
            variant="outlined"
            sx={{ mb: 1, bgcolor: "black", color: "white" }}
            onClick={() => {
              setMarkerType("blue");
;
            }}
          >
            🫐 Set the Blue mark
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSendData();
            }}
            disabled={isSendDataDisabled}
          >
            {isSendDataDisabled?'Недоступно':'🚀 Send data'}
          </Button>
        </Box>}/>)}
      
      {!isSmallScreen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            backgroundColor: "#ffffffd9",
            boxShadow: theme.shadows[5],
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            borderRadius: 2,
            width: "auto",
            maxWidth: "300px",
            transition: "height 0.3s ease",
            p:1, 
            pt:2
          }}
        >
          <Button
            variant="outlined"
            sx={{ mx: 1, bgcolor: "black" }}
            onClick={() => setMarkerType("red")}
          >
            📍 Set the Red mark
          </Button>
          <Button
            variant="outlined"
            sx={{ mx: 1, my: 1, bgcolor: "black" }}
            onClick={() => setMarkerType("blue")}
          >
            🫐 Set the Blue mark
          </Button>
          <Button variant="contained" sx={{ mx: 1 }} onClick={handleSendData} disabled={isSendDataDisabled}>
            🚀 Send data
          </Button>
        </Box>
      )}
</>
  );
};

export default SidePanel;