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

import './careForm.css';

// const label = { inputProps: { 'aria-label': 'useDate'} };

export default class CareForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            water: null,
            fertilize: null,
            treat: null,
            repot: null,
            customEvent: null,
            date: null,
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
            <div className="careForm">
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <div className="formContainer">
                        <div >
                            <TextField fullWidth id="water" className="formField" label="Water" value={this.state.water} variant="standard" onChange={this.handleInputChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="repot" className="formField" label="Repot" value={this.state.repot} variant="standard" onChange={this.handleInputChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="fertilize" className="formField" label="Fertilize" value={this.state.fertilize} variant="standard" onChange={this.handleInputChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="treat" className="formField" label="Treatment" value={this.state.treat} variant="standard" onChange={this.handleInputChange} />
                        </div>
                        <div >
                            <div style={{ display: 'flex' }}>
                                {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                                <DatePicker disabled={!this.state.useDate} fullWidth id="acqDate" label="Acquisition Date" value={this.state.acqDate} onChange={this.handleDateChange} renderInput={(params) => <TextField fullWidth value={this.state.acqDate} {...params} />}/>
                                <Tooltip title="Uncheck to disable date">
                                    <Checkbox checked={this.state.useDate} onChange={this.toggleUseDate}/>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
        )
    }
}