import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import './App.css';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

import DataManager from "./service/DataManager"

function App() {
  const [data, setData] = useState(DataManager.getData());
  const [rightSideData, setRightSideData] = useState({})

  useEffect(() => {
    setRightSideData(rightSideDataWatcher())
  }, [])

  const dataHandler = () => {
    setData(DataManager.getData());
    setRightSideData(rightSideDataWatcher())
  }

  const rightSideDataWatcher = () => {
    let dict = {}
    let averageTime = 0
    let category = {}
    if (data) {
      data.map((item, i) => {
        averageTime += item.timeSpent

        item.category.map((c, j) => {
          if (!category[c]) {
            category[c] = 1
          } else {
            category[c] += 1
          }
        })
      })

      dict.averageTime = averageTime / data.length
    }
    dict.total = data.length
    dict.category = category
    dict.weakTopics = weakTopicsMapper(dict.averageTime)
    dict.strongTopics = strongTopicsMapper(dict.averageTime)
    return dict
  }

  const weakTopicsMapper = (averageTime) => {
    let arr = []
    if (data) {
      data.filter(item => item.timeSpent > averageTime).map(item => arr = [...arr, ...item.category])
    }
    return arr
  }

  const strongTopicsMapper = (averageTime) => {
    let arr = []
    if (data) {
      data.filter(item => item.timeSpent <= averageTime).map(item => arr = [...arr, ...item.category])
    }
    return arr
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Board data={data} handler={dataHandler}/>
      </Grid>
      <Grid item xs={2}>
        <Sidebar data={data} rightSideData={rightSideData} />
      </Grid>
    </Grid>
  );
}

export default App;
