import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { Box } from "@material-ui/core";

import Chip from './Chip';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "350px",
      height: "100%",
      position: "fixed",
      top: 0,
      right: 0,
      background: "#496F5D"
    }
  }));

const Sidebar = (props) => {
    const classes = useStyles()
    const [data, setData] = useState(props.data)
    const [rightSideData, setRightSideData] = useState(props.rightSideData)

    console.log(props.rightSideData)

    useEffect(() => {
      setData(props.data)
    },[props.data])

    useEffect(() => {
      setRightSideData(props.rightSideData)
    },[props.rightSideData])

    const chips = (attribute) => {
      return (
        rightSideData[attribute] && rightSideData[attribute].length > 0 ? rightSideData[attribute].map((item, i) => <Chip key={i} label={item} />) : "None"
      )
    }

    return (
        <AppBar position="sticky" className={classes.root}>
            {(data && rightSideData['category']) ?
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {Object.keys(rightSideData['category']).map((key, i) => {
                  const value = `${key} x${rightSideData['category'][key]}`
                  return (
                    <Chip key={i} label={value} />
                  )
                })}
              </Box>
            : <h5>No data available. Please add a new item.</h5>}

            <p>Total solved questions: {rightSideData.total && rightSideData.total}</p>
            <p>Average time spent: {rightSideData.averageTime && rightSideData.averageTime}</p>
            <p>Weak topics: {chips('weakTopics')}
            </p>
            <p>Strong topics: {chips('strongTopics')}
            </p>
            <p>Topics you've never tried: {chips('neverTriedTopics')}</p>
        </AppBar>
    );
}

export default Sidebar;