import React from 'react';

import './plantInfo.css';

class PlantInfo extends React.Component {
    render() {
        return (
            <div className="plantInfoCard">
                <h4>Hello Plant Info</h4>
                <table className="plantInfoCardTable">
                    <tr>
                        <td>Botanical Name</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Light Needs</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Water Needs</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Fertilizer Needs</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Acquired</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Last Treated</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td> </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default PlantInfo;