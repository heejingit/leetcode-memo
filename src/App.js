import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import './App.css';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

import DataManager from "./service/DataManager"

function App() {
  const [data, setData] = useState(DataManager.getData());
  const [map, setMap] = useState({})

  useEffect(() => {
    setMap(categoryMapper())
  }, [])

  const dataHandler = () => {
    setData(DataManager.getData());
    setMap(categoryMapper())
  }

  const categoryMapper = () => {
    let dict = {}
    if (data) {
      data.map((item, i) => {
        item.category.map((c, j) => {
          if (!dict[c]) {
            dict[c] = 1
          } else {
            dict[c] += 1
          }
        })
      })
    }
    return dict
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Board data={data} handler={dataHandler}/>
      </Grid>
      <Grid item xs={2}>
        <Sidebar data={data} category={map} />
      </Grid>
    </Grid>
  );
}

export default App;
