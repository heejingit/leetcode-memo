import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import './App.css';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

import DataManager from "./service/DataManager"

function App() {
  const [data, setData] = useState(DataManager.getData());

  useEffect(() => {
    setData(DataManager.getData())
  }, [data])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Board data={data} />
      </Grid>
      <Grid item xs={2}>
        <Sidebar data={data} />
      </Grid>
    </Grid>
  );
}

export default App;
