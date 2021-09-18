import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { render } from 'react-dom';

const useStyles = makeStyles({
  root: {
    width: 100,
  },
});

class SliderComponent extends React.Component {
  render() {
    return (
      <Slider
        defaultValue={this.props.value}
        valueLabelDisplay="off"
        disabled
        step={1}
        min={0}
        max={10}
      />
    );
  }
}

export default SliderComponent;
