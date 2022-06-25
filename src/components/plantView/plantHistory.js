import React from 'react';

import PantryService from '../../services/pantryService';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableContainer';
import Paper from '@mui/material/TableContainer';
// import Button from '@mui/material/Button';


import './plantHistory.css';

class PlantHistory extends React.Component {

    constructor(props) {
        super(props);
        // events is an object ob history objects, how fun
        this.state = {
            events: null,
        }
        // single event obj, many events
        // {
        //    eventDate,
        //    eventId,
        //    plantId,
        //    eventType
        // }
        this.createData = this.createData.bind(this);
        this.makeRows = this.makeRows.bind(this);
    }

    componentDidMount() {
        const selectedPlant = this.props.plant;
        console.log(selectedPlant);
        PantryService.fetchEventsForPlant(selectedPlant.plantId).then((res) => {
            console.log(res.data);
            this.setState({
                events: res.data,
            });
        });
    }

    createData(eventType, eventDate, eventId) {
        return {eventType, eventDate, eventId};
    }

    makeRows(eventObj) {
        let rows = []
        console.log(eventObj);
        for (let individualEvent in eventObj) {
            
            rows.push(this.createData(individualEvent.eventType, individualEvent.eventDate, individualEvent.eventId));
        }
        let sortedRows = rows.sort((a, b) => {
            return new Date(b.eventDate) - new Date(a.eventDate);
        });
        console.log(sortedRows);
        return sortedRows;
    }


    render() {

        if (this.state.events !== null) {

            let eventRows = this.makeRows(this.state.events);
            console.log(eventRows);

           return (
               <div className="plantHistoryCard">
                   <TableContainer component={Paper}>
                       <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                           <TableBody>
                               {eventRows.map((row) => (
                                   <TableRow
                                       key={row.eventId}
                                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                   >
                                       {/*<TableCell component="th" scope="row">*/}
                                       {/*    {row.eventType}*/}
                                       {/*</TableCell>*/}
                                       {/*<TableCell align="right">{row.eventDate}</TableCell>*/}
                                       <TableCell>
                                           {row.eventType}
                                       </TableCell>
                                       <TableCell align="right">{row.eventDate}</TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                   </TableContainer>
               </div>
           )
        } else {
            return(
                <div className="plantHistoryCard">

                </div>
            )
        }
    }
}

export default PlantHistory;