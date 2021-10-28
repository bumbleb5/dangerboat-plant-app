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
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         waterEvent: false,
    //         waterDate: moment().format(),
    //         fertilizeEvent: false,
    //         fertilizeDate: moment().format(),
    //         treatEvent: false,
    //         treatDate: moment().format(),
    //         repotEvent: false,
    //         repotDate: moment().format(),
    //         // customEvent: true,
    //         // customEventDate: moment().format(),
    //         // date: moment().format(),
    //         // useDate: true,
    //     }
    //     // this.handleInputChange = this.handleInputChange.bind(this);
    //     this.handleDateChange = this.handleDateChange.bind(this);
    //     this.handleFertilizeChange = this.handleFertilizeChange.bind(this);
    //     this.handleWaterChange = this.handleWaterChange.bind(this);
    //     this.handleRepotChange = this.handleRepotChange.bind(this);
    //     this.handleFertilizeChange = this.handleFertilizeChange.bind(this);
    //     // this.toggleUseDate = this.toggleUseDate.bind(this);
    // }

    // handleInputChange = (e) => {
    //     console.log(e.target.id);
    //     let field = e.target.id;
    //     let value = e.target.value;
    //     // it is unhappy about the field it seems to want an exact key
    //     this.setState({ [field]: value });
    // }

    // handleDateChange = (e) => {
    //     // console.log(e);
    //     // console.log(e._d);
    //     console.log(e);
    //     let date = moment(e._d).format();
    //     // let field = 
    //     console.log(date);
    //     this.setState({ acqDate: date });
    // }

    // handleWaterChange = (e) => {
    //     // console.log(e);
    //     let date = moment(e._d).format();
    //     this.setState({ waterDate: date });
    // }

    // handleRepotChange = (e) => {
    //     // console.log(e);
    //     let date = moment(e._d).format();
    //     this.setState({ repotDate: date });
    // }

    // handleTreatChange = (e) => {
    //     // console.log(e);
    //     let date = moment(e._d).format();
    //     this.setState({ treatDate: date });
    // }

    // handleFertilizeChange = (e) => {
    //     // console.log(e);
    //     let date = moment(e._d).format();
    //     this.setState({ fertilizeDate: date });
    // }

    // toggleUseDate = (e) => {
    //     console.log(e);
    //     let eventType = e.target.id;
    //     this.setState({
    //         // useDate true => toggle to false, clear date
    //         [eventType]: !this.state[eventType],
    //         // acqDate: this.state.useDate ? null : moment().format(),
    //     });
    // }

    render() {
        if (this.props.currentStep !== 2) {
            return null;
        }

        return (
            <div className="careForm">
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <div className="formContainer">
                        <div style={{ display: 'flex' }}>
                            {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                            <DatePicker disabled={!this.props.waterEvent} fullWidth id="waterDate" label="Watered Plant" value={this.props.waterDate} onChange={this.props.handleWaterChange} renderInput={(params) => <TextField fullWidth value={this.props.waterDate} {...params} />}/>
                            <Tooltip title={this.props.waterEvent ? "Uncheck to remove water event" : "Check to add water event"}>
                                <Checkbox id="waterEvent" checked={this.props.waterEvent} onChange={this.props.toggleUseDate}/>
                            </Tooltip>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                            <DatePicker disabled={!this.props.repotEvent} fullWidth id="repotDate" label="Repotted Plant" value={this.props.repotDate} onChange={this.props.handleRepotChange} renderInput={(params) => <TextField fullWidth value={this.props.repotDate} {...params} />}/>
                            <Tooltip title={this.props.repotEvent ? "Uncheck to remove repot event" : "Check to add repot event"}>
                                <Checkbox id="repotEvent" checked={this.props.repotEvent} onChange={this.props.toggleUseDate}/>
                            </Tooltip>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                            <DatePicker disabled={!this.props.fertilizeEvent} fullWidth id="fertilizeDate" label="Fertilized Plant" value={this.props.fertilizeDate} onChange={this.props.handleFertilizeChange} renderInput={(params) => <TextField fullWidth value={this.props.fertilizeDate} {...params} />}/>
                            <Tooltip title={this.props.fertilizeEvent ? "Uncheck to remove fertilize event" : "Check to add fertilize event"}>
                                <Checkbox id="fertilizeEvent" checked={this.props.fertilizeEvent} onChange={this.props.toggleUseDate}/>
                            </Tooltip>
                        </div>
                        {/* <div >
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
                        </div> */}
                        <div style={{ display: 'flex' }}>
                            {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                            <DatePicker disabled={!this.props.treatEvent} fullWidth id="acqDate" label="Treated Plant" value={this.props.treatDate} onChange={this.props.handleTreatChange} renderInput={(params) => <TextField fullWidth value={this.props.treatDate} {...params} />}/>
                            <Tooltip title={this.props.treatEvent ? "Uncheck to remove treatment event" : "Check to add treatment event"}>
                                <Checkbox id="treatEvent" checked={this.props.treatEvent} onChange={this.props.toggleUseDate}/>
                            </Tooltip>
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
        )
    }
}