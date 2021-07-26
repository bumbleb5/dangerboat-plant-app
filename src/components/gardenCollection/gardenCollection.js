import React from 'react';
import PlantCard from './plantCard/plantCard';

class GardenCollection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Hello Garden Collection</p>
                <PlantCard/>
            </div>
        )
    }
}

export default GardenCollection;