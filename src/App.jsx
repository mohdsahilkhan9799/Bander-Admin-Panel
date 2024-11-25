import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';  
import routes, { renderRoutes } from './routes'; 
import DataStore from './SliceStore/DataStore';  

const App = () => {
  return (
    <Provider store={DataStore}>
      <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
        {renderRoutes(routes)} 
      </BrowserRouter>
    </Provider>
  );
};

export default App;
