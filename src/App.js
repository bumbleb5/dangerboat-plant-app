// import dotenv from 'dotenv'

import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import plantService from './services/plantService';
import pantryService from './services/pantryService';

import GardenCollection from './components/gardenCollection/gardenCollection.js';
import PlantView from './components/plantView/plantView';
// import AddPlantForm from './components/addPlantForm/addPlantForm';
// import AddCareForm from './components/addCareForm/addCareForm';
import NavBar from './components/navBar/navBar';
// import logo from './logo.svg';
import './App.css';

// dotenv.config();

// lazy loading of form that we dont need immediately
const AddPlantForm = React.lazy(() => import('./components/addPlantForm/addPlantForm'));
const AddCareForm = React.lazy(() => import('./components/addCareForm/addCareForm'));

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
        };
    }

    componentDidMount() {
        // // TODO: refactor for plantsService
        // console.log('Getting plants');
        // axios.get('/plants').then((response) => {
        //     const plants = JSON.parse(JSON.stringify(response.data));
        //     console.log(plants);
        // });
        // plantService.fetchPlants().then((plantArr) => {
        //     console.log('IN MAIN APP');
        //     console.log(plantArr);
        //     this.setState({
        //         plants: plantArr
        //     });
        // });
        pantryService.fetchPlantsFromPantry().then((plantArr) => {
            console.log('IN MAIN APP');
            console.log(plantArr);
            this.setState({
                plants: plantArr
            });
        });
    }

    render() {
        return (
            <main className="App">
                <NavBar />
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch basename="/">
                        <Route path="/addPlant">
                            <AddPlantForm />
                        </Route>
                        <Route path="/addCare">
                            <AddCareForm />
                        </Route>
                        <Route exact path="/">
                            <GardenCollection plants={this.state.plants}/>
                        </Route>
                        <Route path="/plantView/:plantId" component={ PlantView }>
                        </Route>
                    </Switch>
                </Suspense>
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
