import React from 'react';
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

const Sidebar = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" className={classes.root}>
            <div>Right</div>
            <div>appBar</div>
            <Button>try me</Button>
            <Button>try me2</Button>
          </AppBar>
    );
}

export default Sidebar;