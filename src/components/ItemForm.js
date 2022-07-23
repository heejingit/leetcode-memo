import React, { useEffect, useState } from 'react';
import UUID from 'react-uuid';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid } from "@material-ui/core";
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from './Chip';

import DataManager from '../service/DataManager';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;});

const ItemForm = (props) => {
    const getStyles = (option, category, theme) => {
        return {
          fontWeight:
            category.indexOf(option) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isNew = props.isNew;

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [timeSpent, setTimeSpent] = useState(0);
    const [category, setCategory] = useState([]);
    const [note, setNote] = useState("");
    const [personalDifficulty, setPersonalDifficulty] = useState("easy");

    // errors
    const [titleErr, setTitleErr] = useState(false)
    const [linkErr, setLinkErr] = useState(false)
    const [noteErr, setNoteErr] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    useEffect(() => {
        if (props.item) {
            setTitle(props.item.title);
            setLink(props.item.link);
            setDifficulty(props.item.difficulty);
            setTimeSpent(props.item.timeSpent);
            setCategory(props.item.category);
            setNote(props.item.note);
            setPersonalDifficulty(props.item.personalDifficulty);
        }       
    }, [props.item])

    const handleClickOk = () => {
        if (isValidated()) {
            const obj = {
                id: props.item ? props.item.id : UUID(),
                title: title,
                dateTime: new Date().toLocaleString(),
                link: link,
                difficulty: difficulty,
                category: category,
                timeSpent: timeSpent,
                note: note,
                personalDifficulty: personalDifficulty,
                isFavourite: false
            }
    
            const savedData = DataManager.saveData(isNew, obj, props.data);
    
            //if (!isNew) props.handleItemUpdate(obj);
    
            clearData();
            props.dataHandler(savedData)
        } else {
            setErrorMsg("Please fill the required fields.")
        }
    }

    const clearData = () => {
        setTitle("")
        setLink("")
        setDifficulty("easy")
        setCategory([])
        setTimeSpent(0)
        setNote("")
        setPersonalDifficulty("easy")
        setErrorMsg()
        setTitleErr(false)
        setLinkErr(false)
        setNoteErr(false)

        handleClose();
    }

    const handleClose = () => {
        props.handleCloseDialog(false);
    };

    const handleCategoryChange = (event) => {
        const {
          target: { value },
        } = event;
        setCategory(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const isValidated = () => {
        let isValid = true

        if (!title || title === "") {
            isValid = false
            setTitleErr(true)
        }
        if (!link || link === "") {
            isValid = false
            setLinkErr(true)
        }
        if (!note || note === "") {
            isValid = false
            setNoteErr(true)
        }

        return isValid
    }

    return (
        <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="xl"
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
                {isNew ? 
                    <DialogTitle>{"Add your new Leetcode note"}</DialogTitle> 
                    : <DialogTitle>{"Edit your existing Leetcode note"}</DialogTitle>}
                <DialogContent>
                    <FormControl sx={{ m: 1, width: "80%" }}>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item>
                                {isNew && <DialogContentText id="alert-dialog-slide-description">
                                    What did you grind? Let me know!<br />
                                </DialogContentText>}
                                {errorMsg && <DialogContentText id="alert-dialog-slide-description" style={{color: "red"}}>
                                    {errorMsg}<br />
                                </DialogContentText>}
                            </Grid>

                            <Grid item>
                                <FormLabel id="title-text-field">Title</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    aria-labelledby="title-text-field"
                                    id="outlined-required"
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                    error={titleErr}
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
                                    value={link}
                                    error={linkErr}
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
                                    value={timeSpent}
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
                                    error={noteErr}
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
        )
    
}

export default ItemForm;