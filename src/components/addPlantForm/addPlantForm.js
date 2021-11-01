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
import Alert from "@mui/material/Alert";
// import TextField from '@mui/material/TextField';
// import DatePicker from '@mui/lab/DatePicker';
// // import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateAdapter from '@mui/lab/AdapterMoment';
// // import Grid from '@mui/material/Grid';
// import Checkbox from '@mui/material/Checkbox';
// import Tooltip from '@mui/material/Tooltip';
// import Stack from '@mui/material/Stack';
// import Slider from '@mui/material/Slider';
//
// import Icon from '@mdi/react';
// import {mdiWater} from '@mdi/js';
// import {mdiWaterOutline} from '@mdi/js';
// import {mdiBrightness5} from '@mdi/js';
// import {mdiBrightness7} from '@mdi/js';

import PantryService from '../../services/pantryService';
import {uuidv4} from '../../services/utils/uuidv4';

import BasicInfoForm from './reusableForms/basicInfoForm';
import MoreDeetsForm from './reusableForms/moreDeetsForm';
import CareForm from "./reusableForms/careForm";
import MoreDetailsForm from "./reusableForms/moreDeetsForm";

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
            useAcqDate: true,
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
            isError: false,
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

    isRequiredNull() {
        if (this.state.activeStep === 0) {
            if (this.state.commonName.trim() === '' || this.state.commonName === null) {
                return true;
            } else {
                return false;
            }
        }
        return false
    }

    handleNext = () => {
        let newSkipped = this.state.skipped;
        if (this.isStepSkipped(this.state.activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(this.state.activeStep);
        }

        if (this.isRequiredNull()) {
            this.setState({
                isError: true,
            });
            return;
        }

        this.setState({
            activeStep: this.state.activeStep + 1,
            skipped: newSkipped,
        });
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
        if (this.state.activeStep === 2) {
            console.log('Finished, here\'s the result!');
            console.log(this.state);
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const formattedNPK = this.formatNPK();

        const plantId = uuidv4();

        const eventId = uuidv4();

        const plantInfo = {
             [plantId]: {
                 plantId: plantId,
                 commonName: this.state.commonName,
                 nickname: this.state.nickname,
                 botName: this.state.botName,
                 acqDate: this.state.useAcqDate ? this.state.acqDate : null,
                 lightPref: this.state.lightPref === 0 ? null : this.state.lightPref,
                 waterPref: this.state.waterPref === 0 ? null : this.state.waterPref,
                 npkPref: this.state.npkReq ? formattedNPK : null,
                 location: this.state.location === '' ? null : this.state.location,
             }
        };

        const careEvent = {
            [eventId]: {
                waterDate: this.state.waterEvent ? this.state.waterDate : null,
                fertilizeDate: this.state.fertilizeEvent ? this.state.fertilizeDate : null,
                treatEvent: this.state.treatEvent ? this.state.treatDate : null,
                repotEvent: this.state.repotEvent ? this.state.repotDate : null,
            }
        };



        console.log('Submitting!');

        console.log(plantInfo);
        console.log(careEvent);

        PantryService.postNewPlantToPantry(plantInfo).then((res) => {
            alert('We received your plant, head over to your garden collection to view it.');
        }).catch((error) => {
            console.log(error);
        });
        // waterEvent: false,
        //     waterDate: moment().format(),
        //     fertilizeEvent: false,
        //     fertilizeDate: moment().format(),
        //     treatEvent: false,
        //     treatDate: moment().format(),
        //     repotEvent: false,
        //     repotDate: moment().format(),
        if (this.state.waterEvent || this.state.fertilizeEvent || this.state.treatEvent || this.state.repotEvent) {
            PantryService.postEventForPlant(plantId, careEvent);
        }
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

    // handleSubmit(e) {
    //     e.preventDefault();
    //     console.log('submit');
    // }

    // this listens if a backspace is pressed while typing in common name
    // onKeyDownCommonName = (e) {
    //     if (e.keyCode === 8) {
    //         console.log('delete');
    //         let newName = this.state.commonName;
    //     }
    // },

    handleChange(e) {
        console.log(e.target.id);
        let field = e.target.id;
        let value = e.target.value;
        if (field === 'commonName') {
            if (value.trim() !== '') {
                this.setState({
                    isError: false
                });
            }
        }
        this.setState({ [field]: value });
    }

    handleDateChange = (e) => {
        let date = moment(e._d).format();
        console.log(date);
        console.log(e);
        // this.setState({ acqDate: date });
    }

    handleAcqDateChange = (e) => {
        console.log('handling acq date change');
        let date = moment(e._d).format();
        console.log(date);
        this.setState({ acqDate: date });
    }

    toggleUseDate = (e) => {
        // console.log(e);
        let value = e.target.value;
        this.setState({
            [value]: !this.state[value]
        });
    }

    toggleUseEventDate = (e) => {
        let eventType = e.target.id;
        this.setState({
            [eventType]: !this.state[eventType]
        });
    }

    toggleNPKRequired = () => {
        if (this.state.n !== null || this.state.p !== null || this.state.k !== null) {
            this.setState({
                npkReq: true,
            });
        }
    }

    handleNPKChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
        this.toggleNPKRequired();
    }

    formatNPK() {
        const npk = `${this.state.n}-${this.state.p}-${this.state.k}`;
        console.log(npk);
        return npk;
    }

    handleSliderChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleWaterPrefChange = (e) => {
        console.log(e);
        this.setState({
            waterPref: e.target.value
        });
    }

    handleLightPrefChange = (e) => {
        console.log(e);
        this.setState({
            lightPref: e.target.value
        });
    }

    handleWaterChange = (e) => {
        // console.log(e);
        let date = moment(e._d).format();
        this.setState({ waterDate: date });
    }

    handleRepotChange = (e) => {
        // console.log(e);
        let date = moment(e._d).format();
        this.setState({ repotDate: date });
    }

    handleTreatChange = (e) => {
        // console.log(e);
        let date = moment(e._d).format();
        this.setState({ treatDate: date });
    }

    handleFertilizeChange = (e) => {
        // console.log(e);
        let date = moment(e._d).format();
        this.setState({ fertilizeDate: date });
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

    render() {
        return (
            <Card sx={{ width: '75%', margin: '40px auto' }}>
                <CardContent>
                    <Box sx={{ width: '100%' }}>
                        {this.state.isError === true && <Alert severity="info">Common name is a required field</Alert>}
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
                                    
                                    <BasicInfoForm currentStep={this.state.activeStep} handleInputChange={this.handleChange} acqDate={this.state.acqDate} handleDateChange={this.handleAcqDateChange} toggleUseDate={this.toggleUseDate} useAcqDate={this.state.useAcqDate} />
                                    <MoreDeetsForm currentStep={this.state.activeStep} handleInputChange={this.handleChange} handleDateChange={this.handleDateChange} toggleUseDate={this.toggleUseDate} toggleNPKRequired={this.toggleNPKRequired} handleNPKChange={this.handleNPKChange} handleSliderChange={this.handleSliderChange} handleWaterPrefChange={this.handleWaterPrefChange} handleLightPrefChange={this.handleLightPrefChange} />
                                    <CareForm currentStep={this.state.activeStep} handleInputChange={this.handleChange} handleDateChange={this.handleDateChange} handleWaterChange={this.handleWaterChange} handleRepotChange={this.handleRepotChange} handleTreatChange={this.handleTreatChange} handleFertilizeChange={this.handleFertilizeChange} toggleUseDate={this.toggleUseEventDate} waterEvent={this.state.waterEvent} waterDate={this.state.waterDate} repotEvent={this.state.repotEvent} repotDate={this.state.repotDate} fertilizeEvent={this.state.fertilizeEvent} fertilizeDate={this.state.fertilizeDate} treatEvent={this.state.treatEvent} treatDate={this.state.treatDate} />

                                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
                                </Box>
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