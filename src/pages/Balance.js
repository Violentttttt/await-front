import { Container , Box , Typography} from "@mui/material";
import React from "react";

export default function Balance(){
    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h1' sx={{ fontWeight: "bold", my: 8 }}>Скоро...</Typography>
            </Box>
        </Container>
    )
}