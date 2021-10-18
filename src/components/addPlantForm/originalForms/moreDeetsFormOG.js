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

// const label = { inputProps: { 'aria-label': 'useDate'} };

export default class MoreDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lightPref: 0,
            waterPref: 0,
            npkPref: null,
            n: '',
            p: '',
            k: '',
            location: '',
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
        this.setState({[field]: value});
    }

    handleDateChange = (e) => {
        // console.log(e);
        // console.log(e._d);
        let date = moment(e._d).format();
        console.log(date);
        this.setState({acqDate: date});
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
            <div className="moreDetailsForm">
                <Grid id="moreDetailsGridRoot" sx={{ m: 0 }} container spacing={10} direction="row" columns={8} width="85%" margin="0" alignItems="center">
                    <Grid className="gridItem" item sm={4} zeroMinWidth>
                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <Icon path={mdiWaterOutline} title="less water" size={1} color="grey"/>
                            <Slider aria-label="Water" value={this.state.waterPref} onChange={this.handleInputChange}/>
                            <Icon path={mdiWater} title="more water" size={1} color="grey"/>
                        </Stack> </Grid>
                    <Grid item sm={4} zeroMinWidth>
                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <Icon path={mdiBrightness5} title="less light" size={1} color="grey"/>
                            <Slider aria-label="Light" value={this.state.lightPref} onChange={this.handleInputChange}/>
                            <Icon path={mdiBrightness7} title="more light" size={1} color="grey"/>
                        </Stack> </Grid>
                    <Grid item sm={4} zeroMinWidth>
                        <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                            <TextField id="n" className="formField" value={this.state.npkPref} variant="standard"
                                       onChange={this.handleInputChange}/>
                            <TextField id="p" className="formField" value={this.state.npkPref} variant="standard"
                                       onChange={this.handleInputChange}/>
                            <TextField id="k" className="formField" value={this.state.npkPref} variant="standard"
                                       onChange={this.handleInputChange}/>
                        </Stack>
                    </Grid>
                    <Grid item sm={4} zeroMinWidth>
                        <TextField fullWidth id="location" className="formField" label="Location"
                                   value={this.state.location} variant="standard" onChange={this.handleInputChange}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}