import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core';

import './addPlantForm.css';

class AddPlantForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plantName: '',
            botanicalName: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            <div>
                <Stepper alternativeLabel="true">

                </Stepper>
                {/*<form>*/}

                {/*    <div className="addPlantName">*/}
                {/*        <label htmlFor="plantName">Name</label>*/}
                {/*        <input type="text" value={ this.state.plantName } onChange={ this.handleChange }/>*/}
                {/*    </div>*/}

                {/*    <div className="addPlantBotanicalName">*/}
                {/*        <label htmlFor="botanicalName">Botanical Name</label>*/}
                {/*        <input type="text" value={ this.state.plantName } onChange={ this.handleChange }/>*/}
                {/*    </div>*/}

                {/*    <button onClick={ this.handleSubmit }>Add Plant</button>*/}

                {/*</form>*/}
                
            </div>
        );
    }
}

export default AddPlantForm;