import React from 'react';
import {Link} from 'react-router-dom';

import PlantHistory from "./plantHistory";
import PlantInfo from "./plantInfo";
import './plantView.css';

class PlantView extends React.Component {

    componentDidMount() {
        console.log('Hello Plant View');
    }

    render() {
        return (
            <div className="plantViewDiv">
                <div className="plantViewTopContainer">
                    <Link to="/" className="plantViewBackLink">Back to Garden</Link>
                    <h2 className="plantViewName">Plant Name</h2>
                </div>
                <PlantInfo className="plantViewInfo" />
                <PlantHistory className="plantViewHistory" />
            </div>
        )
    }
}

export default PlantView;