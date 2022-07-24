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
    const [category, setCategory] = useState(props.data['category'])
    const [map, setMap] = useState({})

    useEffect(() => {
      console.log(data)
      setData(props.data)
    },[props.data])

    return (
        <AppBar position="sticky" className={classes.root}>
          <div key={props.data}>
          {props.data.length}
          </div>
            {(data && map) ?
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {Object.keys(map).map((key, i) => {
                  console.log(key)
                  return (
                    <Chip key={i} label={map[key]} />
                  )
                })}
              </Box>
            : <h5>No data available. Please add a new item.</h5>}
        </AppBar>
    );
}

export default Sidebar;