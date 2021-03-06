import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";

import Item from './Item';
import ItemForm from './ItemForm';

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
        setFormOpen(!formOpen);
    };

    return (
        <Box className={classes.root}>
             <ItemForm isNew={true} open={formOpen} handleCloseDialog={() => setFormOpen(false)} data={data} />

            <Grid container direction={"column"} spacing={5}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>Add a new item</Button>
                </Grid>
                {!data ? <Grid item><h3>No data available. Please add a new item.</h3></Grid>
                    : data.map((item, index) => {
                        return (
                            <Grid item key={index}>
                                <Item item={item} key={index} data={data} />
                            </Grid>
                        );
                })}
            </Grid>
        </Box>
    );
}

export default Board;