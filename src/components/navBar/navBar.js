import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <div className="navBar">
                    <h2 className="navBarTitle">Plant App</h2>
                    {/* <Link to="/" className="navBarTitle"><h2>Plant App</h2></Link> */}
                    <Link to="/addPlant" className="navBarItems"><h3>Add Plant</h3></Link>
                    {/* <a className="navBarItems"><h3>Add Plant</h3></a> */}
                    {/* <a className="navBarItems"><h3>Add Care</h3></a> */}
                    <Link to="/addCare" className="navBarItems"><h3>Add Care</h3></Link>
                </div>
            </div>
        )
    }
}

export default NavBar;