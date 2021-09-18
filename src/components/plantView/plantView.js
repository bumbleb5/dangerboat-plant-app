import React from 'react';
import { Link } from 'react-router-dom';

import PlantHistory from "./plantHistory";
import PlantInfo from "./plantInfo";
import './plantView.css';

class PlantView extends React.Component {

    componentDidMount() {
        console.log('Hello Plant View');
    }

    render() {
        return (
            <div>
                <div className="plantViewDiv">
                    <div className="plantViewTopContainer">
                        <h2 className="plantViewName">Plant Name</h2>
                    </div>
                    <PlantInfo className="plantViewInfo" />
                    <PlantHistory className="plantViewHistory" />
                </div>
                <div className="plantViewNavLinkDiv">
                    <Link to="/"><p className="plantViewNavLink">Back to <br/> Garden Collection</p></Link>
                    <Link to="/"><p className="plantViewNavLink">Edit Plant <br/> Info</p></Link>
                    <Link to="/"><p className="plantViewNavLink">Edit Plant <br/> Care</p></Link>
                </div>
            </div>
        )
    }
}

export default PlantView;