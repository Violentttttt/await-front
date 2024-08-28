import { Container, Typography } from "@mui/material";
import React from "react";

export default function MuiComponent(){
    return(
        <Container>
            <Typography variant="h1" sx={{ my:4 , textAlign:'center', color:'primary.main'}}>
                Service
            </Typography>
            <Typography variant="h2">Overwiew</Typography>
        </Container>
    )
}