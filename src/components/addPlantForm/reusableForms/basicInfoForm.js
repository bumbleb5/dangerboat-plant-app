import React from 'react';

import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import FormControl from '@mui/material/FormControl';
// import MomentUtils from "@date-io/moment";

import moment from "moment";

import './basicInfoForm.css';

// const label = { inputProps: { 'aria-label': 'useDate'} };

export default class BasicInfoForm extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         commonName: '',
    //         nickname: '',
    //         botName: '',
    //         acqDate: moment().format(),
    //         useDate: true,
    //     }
    //     this.handleInputChange = this.handleInputChange.bind(this);
    //     this.handleDateChange = this.handleDateChange.bind(this);
    //     this.toggleUseDate = this.toggleUseDate.bind(this);
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
    //     let date = moment(e._d).format();
    //     console.log(date);
    //     this.setState({ acqDate: date });
    // }

    // toggleUseDate = () => {
    //     this.setState({
    //         // useDate true => toggle to false, clear date
    //         useDate: !this.state.useDate,
    //         acqDate: this.state.useDate ? null : moment().format(),
    //     });
    // }

    render() {

        if (this.props.currentStep !== 0) {
            return null;
        }

        return (
            <div className="basicInfoForm">
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <div className="formContainer">
                        <div >
                            <TextField fullWidth id="commonName" className="formField" label="Common Name" value={this.props.commonName} variant="standard" onChange={this.props.handleInputChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="botName" className="formField" label="Botanical Name" value={this.props.botName} variant="standard" onChange={this.props.handleInputChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="nickname" className="formField" label="Nickname (optional)" value={this.props.nickname} variant="standard" onChange={this.props.handleInputChange} />
                        </div>
                        <div >
                            <div style={{ display: 'flex' }}>
                                {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                                <DatePicker disabled={!this.props.useAcqDate} fullWidth id="useAcpDate" label="Acquisition Date" value={this.props.acqDate} onChange={this.props.handleDateChange} renderInput={(params) => <TextField fullWidth value={this.props.acqDate} {...params} />}/>
                                <Tooltip title="Uncheck to disable date">
                                    <Checkbox checked={this.props.useAcqDate} value="useAcqDate" onChange={this.props.toggleUseDate}/>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {this.isStepOptional(this.state.activeStep) && (
                            <Button color="inherit" onClick={this.handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={this.handleNext}>
                            {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box> */}
                </LocalizationProvider>
            </div>
        )
    }
}