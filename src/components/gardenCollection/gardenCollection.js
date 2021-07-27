import React from 'react';
import PlantCard from './plantCard/plantCard';
import './gardenCollection.css';

const plants = [
    {
        name: 'aloe',
        waterNeeds: 2,
        id: 1
    },
    {
        name: 'hoya carnosa',
        waterNeeds: 'top 1 in of soil dry',
        id: 2
    },
    {
        name: 'golden pothos',
        id: 3
    },
    {
        name: 'fern',
        waterNeeds: 3,
        id: 4
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