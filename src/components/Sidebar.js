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

    useEffect(() => {
      setData(props.data)
    },[props.data])

    useEffect(() => {
      setRightSideData(props.rightSideData)
    },[props.rightSideData])

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

            <p>Total solved questions: {rightSideData.total}</p>
            <p>Average time spent: </p>
            <p>Streak: </p>
            <p>Weakest topic: </p>
            <p>Strongest topic: </p>
            <p>Topics you've never tried: </p>
        </AppBar>
    );
}

export default Sidebar;