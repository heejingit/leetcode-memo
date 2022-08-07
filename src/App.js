import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import './App.css';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

import { options } from "./category"
import DataManager from "./service/DataManager"

function App() {
  const [data, setData] = useState([]);
  const [rightSideData, setRightSideData] = useState({})

  useEffect(() => {
    setData(DataManager.getData())
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
    dict.neverTriedTopics = options.filter(item => ![...dict.weakTopics, ...dict.strongTopics].includes(item))

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
        <Board data={data} key={data} handler={dataHandler}/>
      </Grid>
      <Grid item xs={2}>
        <Sidebar data={data} key={rightSideData} rightSideData={rightSideData} />
      </Grid>
    </Grid>
  );
}

export default App;
