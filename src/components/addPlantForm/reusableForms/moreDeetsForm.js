import React from 'react';

import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

import Icon from '@mdi/react';
import {mdiWater} from '@mdi/js';
import {mdiWaterOutline} from '@mdi/js';
import {mdiBrightness5} from '@mdi/js';
import {mdiBrightness7} from '@mdi/js';
// import FormControl from '@mui/material/FormControl';
// import MomentUtils from "@date-io/moment";

import moment from "moment";

import './moreDeetsForm.css'

// const label = { inputProps: { 'aria-label': 'useDate'} };

export default class MoreDetailsForm extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         lightPref: 0,
    //         waterPref: 0,
    //         n: '',
    //         p: '',
    //         k: '',
    //         location: '',
    //         npkReq: false,
    //     }
    //     this.handleInputChange = this.handleInputChange.bind(this);
    //     this.handleDateChange = this.handleDateChange.bind(this);
    //     this.toggleUseDate = this.toggleUseDate.bind(this);
    //     this.toggleNPKRequired = this.toggleNPKRequired.bind(this);
    //     this.handleNPKChange = this.handleNPKChange.bind(this);
    //     this.formatNPK = this.formatNPK.bind(this);
    //     this.handleSliderChange = this.handleSliderChange.bind(this);
    // }

    // handleInputChange = (e) => {
    //     console.log(e.target.id);
    //     let field = e.target.id;
    //     let value = e.target.value;
    //     this.setState({[field]: value});
    // }

    // handleDateChange = (e) => {
    //     // console.log(e);
    //     // console.log(e._d);
    //     let date = moment(e._d).format();
    //     console.log(date);
    //     this.setState({acqDate: date});
    // }

    // toggleUseDate = () => {
    //     this.setState({
    //         // useDate true => toggle to false, clear date
    //         useDate: !this.state.useDate,
    //         acqDate: this.state.useDate ? null : moment().format(),
    //     });
    // }

    // toggleNPKRequired = () => {
    //     if (this.state.n !== null || this.state.p !== null || this.state.k !== null) {
    //         this.setState({
    //             npkReq: true,
    //         });
    //     }
    // }

    // handleNPKChange = e => {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     });
    //     this.toggleNPKRequired();
    // }

    // formatNPK() {
    //     const npk = `${this.state.n}-${this.state.p}-${this.state.k}`;
    //     console.log(npk);
    //     return npk;
    // }

    // handleSliderChange = (e) => {
    //     console.log(e);
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <div className="moreDetailsForm">
                <div className="formContainer">
                    <div>
                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <Icon path={mdiWaterOutline} title="less water" size={1} color="grey"/>
                            <Slider aria-label="Water" id="waterPref" name="waterPref" defaultValue={0} onChangeCommitted={this.props.handleWaterPrefChange} min={0} max={10}/>
                            <Icon path={mdiWater} title="more water" size={1} color="grey"/>
                        </Stack>
                    </div>
                    <div >
                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <Icon path={mdiBrightness5} title="less light" size={1} color="grey"/>
                            <Slider aria-label="Light" id="lightPref" name="lightPref" defaultValue={0} onChangeCommitted={this.props.handleLightPrefChange} min={0} max={10}/>
                            <Icon path={mdiBrightness7} title="more light" size={1} color="grey"/>
                        </Stack>
                    </div>
                    <div >
                        <Stack spacing={4} direction="row" alignItems="center" sx={{ padding: '0 50px 0 50px' }}>
                            <TextField id="n" className="formField" value={this.props.n} variant="standard"
                                       onChange={this.props.handleNPKChange} label="N"/>
                            <TextField id="p" className="formField" value={this.props.p} variant="standard"
                                       onChange={this.props.handleNPKChange} label="P"/>
                            <TextField id="k" className="formField" value={this.props.k} variant="standard"
                                       onChange={this.props.handleNPKChange} label="K"/>
                        </Stack>
                    </div>
                    <div >
                        <TextField fullWidth id="location" className="formField" label="Location" margin="none"
                                   value={this.props.location} variant="standard" onChange={this.props.handleInputChange}/>
                    </div>
                </div>
            </div>
        )
    }
}