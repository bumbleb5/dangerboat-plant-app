import React from 'react';
import PlantCard from './plantCard/plantCard';
import './gardenCollection.css';

const plants = [
    {
        name: 'aloe',
        waterNeeds: 2
    },
    {
        name: 'hoya carnosa',
        waterNeeds: 'top 1 in of soil dry'
    },
    {
        name: 'golden pothos'
    },
    {
        name: 'fern',
        waterNeeds: 3
    }
];

class GardenCollection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gardenCollection">
                {
                    plants.map((plant) => {
                        return <PlantCard plant={ plant } key={ plant.name }/>
                    })
                }
            </div>
        )
    }
}

export default GardenCollection;