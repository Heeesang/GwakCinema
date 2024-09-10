import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as P from "./pages";

function App() {
  return (
    <Routes>
      <Route path='/' element={<P.Main/>}/>
    </Routes>
  );
}

export default App;
