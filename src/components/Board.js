import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";

import Item from './Item';
import ItemForm from './ItemForm';

import DataManager from '../service/DataManager';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 50,
        marginLeft: 80
    },
    nonTextFields: {
        marginLeft: 16
    }
}));

const Board = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(props.data)

    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        setData(props.data)
    },[props.data])

    const handleClickOpen = () => {
        props.handler()
        setFormOpen(!formOpen);
    };

    const handleDeleteAll = () => {
        confirmAlert({
            title: 'Are you sure to delete all items?',
            message: `You can't restore the data unless you've backed it up beforehand.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  DataManager.deleteData()
                  props.handler()
                  alert('All data has been successfully deleted.')
                }
              },
              {
                label: 'No',
                onClick: () => alert('Delete action has been canceled.')
              }
            ]
          });
    }

    return (
        <Box className={classes.root}>
             <ItemForm isNew={true} open={formOpen} handleCloseDialog={() => setFormOpen(false)} data={data} handler={props.handler}/>

            <Grid container direction={"column"} spacing={5}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>Add a new item</Button>
                    <Button variant="text" size="large" color="secondary" onClick={handleDeleteAll}>Delete all items</Button>
                </Grid>
                {!data ? <Grid item><h3>No data available. Please add a new item.</h3></Grid>
                    : data.map((item, index) => {
                        return (
                            <Grid item key={index}>
                                <Item item={item} key={index} data={data} handler={props.handler} />
                            </Grid>
                        );
                })}
            </Grid>
        </Box>
    );
}

export default Board;