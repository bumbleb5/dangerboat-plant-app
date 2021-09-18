import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// import { render } from 'react-dom';

// I dont even know why i did this
// const useStyles = makeStyles({
//   root: {
//     width: 100,
//   },
// });

class SliderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    // I thought this might get rid of the warning about a non passive event listner but it didnt
    handleChange(e) {
        console.log('CHANGE');
    }

    render() {
        return (
            <Slider
                defaultValue={Number(this.props.value)}
                valueLabelDisplay="off"
                disabled
                step={1}
                min={0}
                max={10}
                onChange={this.handleChange}
            />
        );
    }
}

export default SliderComponent;
