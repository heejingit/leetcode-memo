import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button } from "@material-ui/core";

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
    const classes = useStyles();
    const [data, setData] = useState(props.data);

    useEffect(() => {
      setData(props.data)
    },[props.data])

    return (
        <AppBar position="sticky" className={classes.root}>
            {data.length}
            <div>appBar</div>
            <Button>try me</Button>
            <Button>try me2</Button>
        </AppBar>
    );
}

export default Sidebar;