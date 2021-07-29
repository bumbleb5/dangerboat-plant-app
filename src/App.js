import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GardenCollection from './components/gardenCollection/gardenCollection.js';
import PlantView from './components/gardenCollection/plantView/plantView';
import AddPlantForm from './components/addPlantForm/addPlantForm';
import AddCareForm from './components/addCareForm/addCareForm';
import NavBar from './components/navBar/navBar';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="App">
                <NavBar />
                <Switch basename="/">
                    <Route path="/addPlant">
                        <AddPlantForm />
                    </Route>
                    <Route path="/addCare">
                        <AddCareForm />
                    </Route>
                    <Route exact path="/">
                        <GardenCollection />
                    </Route>
                    <Route path="/plantView/:plantId" component={ PlantView }>
                    </Route>
                </Switch>
            </main>
        );
    }

}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
