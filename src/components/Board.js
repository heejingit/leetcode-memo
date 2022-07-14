import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Button, Grid } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { options } from "../utils";

import Item from './Item';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;});

const Board = () => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const data = DataManager.getData();

    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");
    const [timeSpent, setTimeSpent] = React.useState(0);
    const [category, setCategory] = React.useState([]);
    const [note, setNote] = React.useState("");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box className={classes.root}>
            <Grid container direction={"column"} spacing={5}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>Add a new item</Button>
                </Grid>

                {data && data.map((item, index) => {
                    <Grid item>
                        <Item item={item} index={index} />
                    </Grid>
                })}

                {!data && <Grid item><h3>No data available. Please add a new item.</h3></Grid>}
            </Grid>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add your new Leetcode note"}</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item>
                                <DialogContentText id="alert-dialog-slide-description">
                                    What did you grind? Let me know!<br />
                                </DialogContentText>
                            </Grid>

                            <Grid item>
                                <FormLabel id="title-text-field">Title</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    aria-labelledby="title-text-field"
                                    id="outlined-required"
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Grid>

                            <Grid item>
                                <FormLabel id="link-text-field">Link</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    aria-labelledby="link-text-field"
                                    id="outlined-required"
                                    onChange={e => setLink(e.target.value)}
                                />
                            </Grid>

                            <Grid item>
                                <FormLabel id="difficulty-radio">Difficulty</FormLabel>
                                <RadioGroup
                                    row
                                    required
                                    aria-labelledby="difficulty-radio"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                                </RadioGroup>
                            </Grid>

                            

                            <Grid item>
                                <FormLabel id="time-text-field">Time spent (min)</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    onChange={e => setTimeSpent(e.target.value)}
                                />
                            </Grid>

                            <Grid item>
                                <FormLabel id="note-multiline">Note</FormLabel>
                                <TextField
                                    id="filled-multiline-flexible"
                                    fullWidth
                                    required
                                    aria-labelledby="note-multiline"
                                    multiline
                                    rows={8}
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item>
                                <FormLabel id="personal-difficulty-radio">Personal Difficulty</FormLabel>
                                <RadioGroup
                                    row
                                    required
                                    aria-labelledby="personal-difficulty-radio"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Board;