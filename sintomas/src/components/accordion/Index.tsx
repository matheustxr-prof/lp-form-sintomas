import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PropsAcordion {
    id: string;
    title: string;
    text: string;
    style:string;
}

export default function Acordion( {id, title, text, style}:PropsAcordion ) {
    return (
        <>
            <Accordion className={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={id}
                    id={id}
                >
                    <Typography className='font-bold'> {title} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {text}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}