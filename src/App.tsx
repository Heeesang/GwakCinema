import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as P from "./pages";

function App() {
  return (
    <Routes>
      <Route path='/' element={<P.Main/>}/>
      <Route path='/movieList' element={<P.MovieList/>}/>
    </Routes>
  );
}

export default App;
