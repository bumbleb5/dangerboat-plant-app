import React from 'react';
import './navBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <div className="navBar">
                    <h2 className="navBarTitle">Plant App</h2>
                    <a className="navBarItems"><h3>Add Plant</h3></a>
                    <a className="navBarItems"><h3>Add Care</h3></a>
                </div>
            </div>
        )
    }
}

export default NavBar;