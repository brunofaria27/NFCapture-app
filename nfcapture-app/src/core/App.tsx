import React from 'react';
import { Header } from '../components/Header/Header';
// import { Footer } from '../components/Footer/Footer';
import { Content } from '../components/Content/Content';
import "./App.scss"
import useEquipments from '../context/useEquipments/useEquipments';
import EquipmentsContext from '../context/useEquipments/EquipmentsContext';
import useUsers from '../context/useUsers/useUsers';
import UsersContext from '../context/useUsers/UsersContext';
import { Footer } from '../components/Footer/Footer';


function App() {

  const equipmentsValues = useEquipments();
  const usersValues = useUsers();

  return (
    <EquipmentsContext.Provider value={equipmentsValues}>
      <UsersContext.Provider value={usersValues}>
        <div className="app__page">
          <Header />
          <div className="app__container">
            <Content />
          </div>
          <Footer />
        </div>
      </UsersContext.Provider>
    </EquipmentsContext.Provider>
  );
}

export default App;