import React from 'react';

import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
// import FormControl from '@mui/material/FormControl';
// import MomentUtils from "@date-io/moment";

import moment from "moment";

import './basicInfoForm.css';

// const label = { inputProps: { 'aria-label': 'useDate'} };

export default class BasicInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commonName: '',
            nickname: '',
            botName: null,
            acqDate: moment().format(),
            useDate: true,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.toggleUseDate = this.toggleUseDate.bind(this);
    }



    handleInputChange = (e) => {
        console.log(e.target.id);
        let field = e.target.id;
        let value = e.target.value;
        // it is unhappy about the field it seems to want an exact key
        this.setState({ [field]: value });
    }

    handleDateChange = (e) => {
        // console.log(e);
        // console.log(e._d);
        let date = moment(e._d).format();
        console.log(date);
        this.setState({ acqDate: date });
    }

    toggleUseDate = () => {
        this.setState({
            // useDate true => toggle to false, clear date
            useDate: !this.state.useDate,
            acqDate: this.state.useDate ? null : moment().format(),
        });
    }

    render() {
        return (
            <div className="basicInfoForm">
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <Grid container spacing={10} direction="row" columns={8} width="85%">
                        <Grid item sm={4} zeroMinWidth  width="85%">
                            <TextField fullWidth id="commonName" className="formField" label="Common Name" value={this.state.commonName} variant="standard" onChange={this.handleInputChange} />
                        </Grid>
                        <Grid item sm={4} zeroMinWidth>
                            <TextField fullWidth id="botName" className="formField" label="Botanical Name" value={this.state.botName} variant="standard" onChange={this.handleInputChange} />
                        </Grid>
                        <Grid item sm={4} zeroMinWidth>
                            <TextField fullWidth id="nickname" className="formField" label="Nickname (optional)" value={this.state.nickname} variant="standard" onChange={this.handleInputChange} />
                        </Grid>
                        <Grid item sm={4} zeroMinWidth>
                            <div style={{ display: 'flex' }}>
                                {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                                <DatePicker disabled={!this.state.useDate} fullWidth id="acqDate" label="Acquisition Date" value={this.state.acqDate} onChange={this.handleDateChange} renderInput={(params) => <TextField fullWidth value={this.state.acqDate} {...params} />}/>
                                <Tooltip title="Uncheck to disable date">
                                    <Checkbox checked={this.state.useDate} onChange={this.toggleUseDate}/>
                                </Tooltip>
                            </div>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </div>
        )
    }
}