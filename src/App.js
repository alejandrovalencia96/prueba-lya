import React from 'react';
import './App.css';

import Register from './components/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container p-4">
    <div className="row">
      <Register/>
    </div>
    <ToastContainer/>
    </div>
  );
}

export default App;
