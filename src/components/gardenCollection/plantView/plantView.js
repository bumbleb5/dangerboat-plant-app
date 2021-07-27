import React from 'react';

import PlantHistory from "./plantHistory";
import PlantInfo from "./plantInfo";

class PlantView extends React.Component {

    componentDidMount() {
        console.log('Hello Plant View');
    }

    render() {
        return (
            <div>
                <h2>Plant Name</h2>
                <PlantHistory />
                <PlantInfo />
            </div>
        )
    }
}

export default PlantView;