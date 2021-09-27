import React from 'react';
import TextField from '@mui/material/TextField';
import './basicInfoForm.css';
// import DatePicker from '@material-ui/lab/lab/DatePicker';

export default class BasicInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commonName: '',
            nickname: '',
            botName: '',
            acqDate: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (e) => {
        console.log(e.target.id);
        let field = e.target.id;
        let value = e.target.value;
        // it is unhappy about the field it seems to want an exact key
        this.setState({field: value});
    }

    render() {
        return (
            <div className="basicInfoForm">
                <TextField id="commonName" className="formField" label="Common Name" value={this.state.commonName} variant="standard" onChange={this.handleInputChange} />
                <TextField id="botName" className="formField" label="Botanical Name" value={this.state.botName} variant="standard" onChange={this.handleInputChange} />
                <TextField id="nickname" className="formField" label="Nickname (optional)" value={this.state.nickname} variant="standard" onChange={this.handleInputChange} />
                {/*<DatePicker id="acqDate" label="Acquisition Date" value={this.plantObj.acqDate} onChange={this.handleDateChange}/>*/}
            </div>
        )
    }
}