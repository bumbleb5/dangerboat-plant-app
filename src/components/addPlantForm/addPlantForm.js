import React from 'react';

import moment from 'moment';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
// import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

import Icon from '@mdi/react';
import {mdiWater} from '@mdi/js';
import {mdiWaterOutline} from '@mdi/js';
import {mdiBrightness5} from '@mdi/js';
import {mdiBrightness7} from '@mdi/js';

// import BasicInfoForm from './reusableForms/basicInfoForm';
// import MoreDeetsForm from './reusableForms/moreDeetsForm';
// import CareForm from "./reusableForms/careForm";
// import MoreDetailsForm from "./reusableForms/moreDeetsForm";

const steps = ['Basic info', 'More details', 'Add care'];

// const labels = [
//     ['Common Name', 'Botanical Name', 'Nickname', 'Acquisition Date'],
//     ['Light Preference', 'Water Preference', 'Fertilizer Preference', 'Location'],
//     ['Repot', 'Water', 'Treat'],
// ];

// const forms = [
//     <BasicInfoForm />, 
//     <MoreDeetsForm/>, 
//     <CareForm />
// ];

class AddPlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Basic info form
            commonName: '',
            nickname: '',
            botName: '',
            acqDate: moment().format(),
            useDate: true,
            // More detail form
            lightPref: 0,
            waterPref: 0,
            n: '',
            p: '',
            k: '',
            location: '',
            npkReq: false,
            // Care form
            waterEvent: false,
            waterDate: moment().format(),
            fertilizeEvent: false,
            fertilizeDate: moment().format(),
            treatEvent: false,
            treatDate: moment().format(),
            repotEvent: false,
            repotDate: moment().format(),
            // stepper state
            activeStep: 0,
            skipped: new Set(),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isStepOptional = this.isStepOptional.bind(this);
        this.isStepSkipped = this.isStepSkipped.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    isStepOptional = (step) => {
        if (step === 1 || step === 2) {
            return true;
        }
    }

    isStepSkipped = (step) => {
        return this.state.skipped.has(step);
    }

    handleNext = () => {
        let newSkipped = this.state.skipped;
        if (this.isStepSkipped(this.state.activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(this.state.activeStep);
        }

        this.setState({
            activeStep: this.state.activeStep + 1,
            skipped: newSkipped,
        });
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
    }

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1});
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    handleSkip = () => {
        if (!this.isStepOptional(this.state.activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        const newSkipped = new Set(this.state.skipped.values());
        newSkipped.add(this.state.activeStep);

        this.setState({
            activeStep: this.state.activeStep + 1,
            skipped: newSkipped,
        })

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped((prevSkipped) => {
        //     const newSkipped = new Set(prevSkipped.values());
        //     newSkipped.add(activeStep);
        //     return newSkipped;
        // });
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        })
        // setActiveStep(0);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
    }

    handleChange(e) {
        console.log(e.target.id);
        let field = e.target.id;
        let value = e.target.value;
        this.setState({ [field]: value });
    }

    handleDateChange = (e) => {
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

    handleNextStep(stepObj) {
        if (this.activeStep === 0) {
            console.log('setting basic details');
            this.setState({
                commonName: stepObj.commonName,
                nickname: stepObj.nickname,
                botName: stepObj.botName,
                acqDate: stepObj.acqDate,
            });
            console.log(this.state);
        } else if (this.activeStep === 1) {
            console.log('setting more details');
            this.setState({
                lightPref: stepObj.lightPref,
                waterPref: stepObj.waterPref,
                n: stepObj.n,
                p: stepObj.p,
                k: stepObj.k,
                location: stepObj.location,
                npkReq: `${stepObj.n}-${stepObj.p}-${stepObj.k}`,
            });
            console.log(this.state);
        } else if (this.activeStep === 2) {
            console.log('setting care details');
            this.setState({
                waterEvent: stepObj.waterEvent,
                waterDate: stepObj.waterDate,
                fertilizeEvent: stepObj.fertilizeDate,
                fertilizeDate: stepObj.fertilizeDate,
                treatEvent: stepObj.treatEvent,
                treatDate: stepObj.treatDate,
                repotEvent: stepObj.repotEvent,
                repotDate: stepObj.repotDate,
            });
            console.log(this.state);
        }
    }

    handleFormChange(field, value) {
        console.log('handle form change from parent!');
        console.log({ [field]: value });
    }

    basicInfoForm = (
        <div className="basicInfoForm">
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <div className="formContainer">
                        <div >
                            <TextField fullWidth id="commonName" className="formField" label="Common Name" value={this.state.commonName} variant="standard" onChange={this.handleChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="botName" className="formField" label="Botanical Name" value={this.state.botName} variant="standard" onChange={this.handleChange} />
                        </div>
                        <div >
                            <TextField fullWidth id="nickname" className="formField" label="Nickname (optional)" value={this.state.nickname} variant="standard" onChange={this.handleChange} />
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

    moreDetailsForm = (
        <div className="moreDetailsForm">
            <div className="formContainer">
                <div>
                    <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                        <Icon path={mdiWaterOutline} title="less water" size={1} color="grey"/>
                        <Slider aria-label="Water" name="waterPref" defaultValue={0} onChangeCommitted={this.handleSliderChange} min={0} max={10}/>
                        <Icon path={mdiWater} title="more water" size={1} color="grey"/>
                    </Stack>
                </div>
                <div >
                    <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                        <Icon path={mdiBrightness5} title="less light" size={1} color="grey"/>
                        <Slider aria-label="Light" name="lightPref" defaultValue={0} onChangeCommitted={this.handleSliderChange} min={0} max={10}/>
                        <Icon path={mdiBrightness7} title="more light" size={1} color="grey"/>
                    </Stack>
                </div>
                <div >
                    <Stack spacing={4} direction="row" alignItems="center" sx={{ padding: '0 50px 0 50px' }}>
                        <TextField id="n" className="formField" value={this.state.n} variant="standard"
                                   onChange={this.handleNPKChange} label="N"/>
                        <TextField id="p" className="formField" value={this.state.p} variant="standard"
                                   onChange={this.handleNPKChange} label="P"/>
                        <TextField id="k" className="formField" value={this.state.k} variant="standard"
                                   onChange={this.handleNPKChange} label="K"/>
                    </Stack>
                </div>
                <div >
                    <TextField fullWidth id="location" className="formField" label="Location" margin="none"
                               value={this.state.location} variant="standard" onChange={this.handleInputChange}/>
                </div>
            </div>
        </div>
    )

    careForm = (
        <div className="careForm">
            <LocalizationProvider dateAdapter={DateAdapter}>
                <div className="formContainer">
                    <div style={{ display: 'flex' }}>
                        {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                        <DatePicker disabled={!this.state.waterEvent} fullWidth id="waterDate" label="Watered Plant" value={this.state.waterDate} onChange={this.handleWaterChange} renderInput={(params) => <TextField fullWidth value={this.state.waterDate} {...params} />}/>
                        <Tooltip title={this.state.waterEvent ? "Uncheck to remove water event" : "Check to add water event"}>
                            <Checkbox id="waterEvent" checked={this.state.waterEvent} onChange={this.toggleUseDate}/>
                        </Tooltip>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                        <DatePicker disabled={!this.state.repotEvent} fullWidth id="repotDate" label="Repotted Plant" value={this.state.repotDate} onChange={this.handleRepotChange} renderInput={(params) => <TextField fullWidth value={this.state.repotDate} {...params} />}/>
                        <Tooltip title={this.state.repotEvent ? "Uncheck to remove repot event" : "Check to add repot event"}>
                            <Checkbox id="repotEvent" checked={this.state.repotEvent} onChange={this.toggleUseDate}/>
                        </Tooltip>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {/* <Checkbox checked={this.state.useDate}{...label} /> */}
                        <DatePicker disabled={!this.state.fertilizeEvent} fullWidth id="fertilizeDate" label="Fertilized Plant" value={this.state.fertilizeDate} onChange={this.handleFertilizeChange} renderInput={(params) => <TextField fullWidth value={this.state.fertilizeDate} {...params} />}/>
                        <Tooltip title={this.state.fertilizeEvent ? "Uncheck to remove fertilize event" : "Check to add fertilize event"}>
                            <Checkbox id="fertilizeEvent" checked={this.state.fertilizeEvent} onChange={this.toggleUseDate}/>
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
                        <DatePicker disabled={!this.state.treatEvent} fullWidth id="acqDate" label="Treated Plant" value={this.state.treatDate} onChange={this.handleTreatChange} renderInput={(params) => <TextField fullWidth value={this.state.treatDate} {...params} />}/>
                        <Tooltip title={this.state.treatEvent ? "Uncheck to remove treatment event" : "Check to add treatment event"}>
                            <Checkbox id="treatEvent" checked={this.state.treatEvent} onChange={this.toggleUseDate}/>
                        </Tooltip>
                    </div>
                </div>
            </LocalizationProvider>
        </div>
    )

    forms = [this.basicInfoForm, this.moreDetailsForm, this.careForm]

    render() {
        return (
            <Card sx={{ width: '75%', margin: '40px auto' }}>
                <CardContent>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={this.state.activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (this.isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption">Optional</Typography>
                                    );
                                }
                                if (this.isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {this.state.activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box id="addPlantFormRoot" sx={{ m: 0 }}>
                                    {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {this.state.activeStep + 1}</Typography>*/}
                                    {/* <BasicInfoForm /> */}
                                    {this.forms[this.state.activeStep]}
                                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                                </Box>
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
                            </React.Fragment>
                        )}
                    </Box>
                </CardContent>
            </Card>
        );
    }
}

export default AddPlantForm;




// import React from 'react';

// import BasicInfoForm from './reusableForms/basicInfoForm';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';

// import './addPlantForm.css';

// const steps = ['Basic info', 'More details', 'Add care'];

// class AddPlantForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             commonName: null,
//             botName: null,
//             acqDate: null,
//             lightPref: null,
//             waterPref: null,
//             npkPref: null,
//             location: null,
//             genusId: null,
//             activeStep: 0,
//             skipped: new Set(),
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.isStepOptional = this.isStepOptional.bind(this);
//         this.isStepSkipped = this.isStepSkipped.bind(this);
//         this.handleNext = this.handleNext.bind(this);
//         this.handleBack = this.handleBack.bind(this);
//         this.handleSkip = this.handleSkip.bind(this);
//         this.handleReset = this.handleReset.bind(this);
//     }

//     isStepOptional = (step) => {
//         if (step === 1 || step === 2) {
//             return true;
//         }
//     }

//     isStepSkipped = (step) => {
//         return this.state.skipped.has(step);
//     }

//     handleNext = () => {
//         let newSkipped = this.state.skipped;
//         if (this.isStepSkipped(this.state.activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(this.state.activeStep);
//         }

//         this.setState({
//             activeStep: this.state.activeStep + 1,
//             skipped: newSkipped,
//         });
//         // setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         // setSkipped(newSkipped);
//     }

//     handleBack = () => {
//         this.setState({activeStep: this.state.activeStep - 1});
//         // setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     }

//     handleSkip = () => {
//         if (!this.isStepOptional(this.state.activeStep)) {
//             // You probably want to guard against something like this,
//             // it should never occur unless someone's actively trying to break something.
//             throw new Error("You can't skip a step that isn't optional.");
//         }

//         const newSkipped = new Set(this.state.skipped.values());
//         newSkipped.add(this.state.activeStep);

//         this.setState({
//             activeStep: this.state.activeStep + 1,
//             skipped: newSkipped,
//         })

//         // setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         // setSkipped((prevSkipped) => {
//         //     const newSkipped = new Set(prevSkipped.values());
//         //     newSkipped.add(activeStep);
//         //     return newSkipped;
//         // });
//     }

//     handleReset = () => {
//         this.setState({
//             activeStep: 0,
//         })
//         // setActiveStep(0);
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         console.log('submit');
//     }

//     handleChange(e) {
//         console.log(e.target.value);
//     }

//     formToRender = (stepIndex) => {
//         switch (stepIndex) {
//             case 0:
//                 return <BasicInfoForm/>;
//                 break;
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <p className="addPlantTitle" style={{fontSize: '35px', color: '#5B4C6B', fontWeight: 'bolder'}}>Add Plant</p>
//                 <Card sx={{ width: '80%', margin: '15px auto' }}>
//                     <CardContent>
//                         <Box sx={{ width: '100%' }}>
//                             <Stepper activeStep={this.state.activeStep}>
//                                 {steps.map((label, index) => {
//                                     const stepProps = {};
//                                     const labelProps = {};
//                                     if (this.isStepOptional(index)) {
//                                         labelProps.optional = (
//                                             <Typography variant="caption">Optional</Typography>
//                                         );
//                                     }
//                                     if (this.isStepSkipped(index)) {
//                                         stepProps.completed = false;
//                                     }
//                                     return (
//                                         <Step key={label} {...stepProps}>
//                                             <StepLabel {...labelProps}>{label}</StepLabel>
//                                         </Step>
//                                     );
//                                 })}
//                             </Stepper>
//                             {this.state.activeStep === steps.length ? (
//                                 <React.Fragment>
//                                     <Typography sx={{ mt: 2, mb: 1 }}>
//                                         All steps completed - you&apos;re finished
//                                     </Typography>
//                                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                         <Box sx={{ flex: '1 1 auto' }} />
//                                         <Button onClick={this.handleReset}>Reset</Button>
//                                     </Box>
//                                 </React.Fragment>
//                             ) : (
//                                 <React.Fragment>
//                                     <Typography sx={{ mt: 2, mb: 1 }}>Step {this.state.activeStep + 1}</Typography>
//                                     <Box>
//                                         {this.formToRender(this.state.activeStep)}
//                                     </Box>
//                                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                         <Button
//                                             color="inherit"
//                                             disabled={this.state.activeStep === 0}
//                                             onClick={this.handleBack}
//                                             sx={{ mr: 1 }}
//                                         >
//                                             Back
//                                         </Button>
//                                         <Box sx={{ flex: '1 1 auto' }} />
//                                         {this.isStepOptional(this.state.activeStep) && (
//                                             <Button color="inherit" onClick={this.handleSkip} sx={{ mr: 1 }}>
//                                                 Skip
//                                             </Button>
//                                         )}
//                                         <Button onClick={this.handleNext}>
//                                             {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                                         </Button>
//                                     </Box>
//                                 </React.Fragment>
//                             )}
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </div>

//         );
//     }
// }

// export default AddPlantForm;