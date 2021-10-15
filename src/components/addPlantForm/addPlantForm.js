import React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const steps = ['Basic info', 'More details', 'Add care'];

class AddPlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: Change variables
            commonName: null,
            botName: null,
            acqDate: null,
            lightPref: null,
            waterPref: null,
            npkPref: null,
            location: null,
            genusId: null,
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
        console.log(e.target.value);
    }

    render() {
        return (
            <Card sx={{ width: '80%', margin: '20px auto' }}>
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
                                <Typography sx={{ mt: 2, mb: 1 }}>Step {this.state.activeStep + 1}</Typography>
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