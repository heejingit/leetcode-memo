import React from 'react';
import UUID from 'react-uuid';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Chip from './Chip';

import Item from './Item';
import DataManager from '../service/DataManager';

const getStyles = (option, category, theme) => {
    return {
      fontWeight:
        category.indexOf(option) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

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
    let data = DataManager.getData();

    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("easy");
    const [timeSpent, setTimeSpent] = React.useState(0);
    const [category, setCategory] = React.useState([]);
    const [note, setNote] = React.useState("");
    const [personalDifficulty, setPersonalDifficulty] = React.useState("easy");
    const [open, setOpen] = React.useState(false);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const options = [
        "Array",
        "String",
        "Hash Table",
        "Dynamic Programming",
        "Math",
        "Sorting",
        "Depth-First Search",
        "Breadth-First Search",
        "Greedy",
        "Database",
        "Tree",
        "Binary Search",
        "Matrix",
        "Binary Tree",
        "Two Pointers",
        "Bit Manipulation",
        "Stack",
        "Design",
        "Heap (Priority Queue",
        "Graph",
        "Simulation",
        "Backtracking",
        "Prefix Sum",
        "Sliding Window",
        "Trie",
        "Linked List"
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategoryChange = (event) => {
        const {
          target: { value },
        } = event;
        setCategory(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClickOk = () => {
        data = !data ? [] : data;

        data.push({
            id: UUID(),
            title: title,
            dateTime: new Date().toLocaleString(),
            link: link,
            difficulty: difficulty,
            category: category,
            timeSpent: timeSpent,
            note: note,
            personalDifficulty: personalDifficulty,
            isFavourite: false
        });

        DataManager.saveData(data);
        clearData();
    }

    const clearData = () => {
        setTitle('');
        setLink('');
        setDifficulty('easy');
        setCategory([]);
        setTimeSpent(0);
        setNote('');
        setPersonalDifficulty('easy');

        handleClose();
    }

    return (
        <Box className={classes.root}>
            <Grid container direction={"column"} spacing={5}>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>Add a new item</Button>
                </Grid>
                {!data ? <Grid item><h3>No data available. Please add a new item.</h3></Grid>
                    : data && data.map((item, index) => {
                        return (
                            <Grid item key={index}>
                                <Item item={item} key={index}/>
                            </Grid>
                        );
                })}
            </Grid>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="xl"
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                          width: "80%",
                          display: "flex",
                          justifyContent: "center"
                        }
                    }
                }}
            >
                <DialogTitle>{"Add your new Leetcode note"}</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, width: "80%" }}>
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
                                    value={difficulty}
                                    onChange={e => setDifficulty(e.target.value)}
                                >
                                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                                </RadioGroup>
                            </Grid>

                            <Grid item>
                                <FormLabel id="demo-multiple-chip-label">Category</FormLabel><br />
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                fullWidth
                                value={category}
                                onChange={handleCategoryChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {options.map((option) => (
                                    <MenuItem
                                    key={option}
                                    value={option}
                                    style={getStyles(option, category, theme)}
                                    >
                                    {option}
                                    </MenuItem>
                                ))}
                                </Select>
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
                                    value={personalDifficulty}
                                    onChange={e => setPersonalDifficulty(e.target.value)}
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
                <Button onClick={clearData}>Cancle</Button>
                <Button onClick={handleClickOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Board;