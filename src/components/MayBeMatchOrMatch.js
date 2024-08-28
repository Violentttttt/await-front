import { Container, Box } from "@mui/material";
import {React, useState} from "react";
import MatchNav from "../components/MatchNav"
import Matches from "./Matches";
import Final from "./Final";


export default function MayBeMatchOrMatch({mayBeMatches}){

    const [content, setContent] = useState(<Matches mayBeMatches={mayBeMatches} />); // Передаем данные


    const handleNavChange = (newValue) => {
        switch(newValue) {
            case 'maybematch':
                setContent(<Matches mayBeMatches={mayBeMatches}/>);
                break;
            case 'match':
                setContent(<Final/>)
                break;
            default:
                setContent('');
        }
    };


    return(
        <Container>
            <MatchNav onChange={handleNavChange} />
            <Box sx={{ flex: 1, }}>
                        {content}
            </Box>
        </Container>

    )
}