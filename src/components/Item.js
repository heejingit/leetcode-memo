import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import Chip from './Chip';
import ItemForm from './ItemForm';
import DataManager from '../service/DataManager';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = (props) => {
    const [expanded, setExpanded] = useState(false);

    const item = props.item;

    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [link, setLink] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [timeSpent, setTimeSpent] = useState(0);
    const [category, setCategory] = useState([]);
    const [note, setNote] = useState("");
    const [personalDifficulty, setPersonalDifficulty] = useState("easy");

    const [isFavourite, setFavourite] = useState(false);
    const [isVisible, setVisible] = useState(true);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
      setTitle(item.title)
      setDateTime(item.dateTime)
      setLink(item.link)
      setDifficulty(item.difficulty)
      setTimeSpent(item.timeSpent)
      setCategory(item.category)
      setNote(item.note)
      setPersonalDifficulty(item.personalDifficulty)
      setFavourite(item.isFavourite)
    }, [item]);

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleFavouriteChange = () => {
      setFavourite(!isFavourite);
      DataManager.setFavourite(item.id, !isFavourite);
    }

    const handleDeleteItem = () => {
      confirmAlert({
        title: 'Are you sure to delete this item?',
        message: item.title,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              DataManager.delete(item.id);
              setVisible(false);
              alert('The item has been successfully deleted.')
            }
          },
          {
            label: 'No',
            onClick: () => alert('Delete action has been canceled.')
          }
        ]
      });
    }

    const handleEditItem = () => {
      setFormOpen(!formOpen);
    }

    const handleItemUpdate = (updatedItem) => {
      setTitle(updatedItem.title)
      setLink(updatedItem.link)
      setDifficulty(updatedItem.difficulty)
      setTimeSpent(updatedItem.timeSpent)
      setCategory(updatedItem.category)
      setNote(updatedItem.note)
      setPersonalDifficulty(updatedItem.personalDifficulty)
    }

    const difficultyChips = (difficulty) => {
      if (difficulty === "easy") {
        return (<Chip color="green" label="Easy" />);
      }
      else if (difficulty === "medium") {
        return (<Chip color="orange" label="Medium" />);
      }
      else if (difficulty === "hard") {
        return (<Chip color="red" label="Hard" />);
      }
    }

    return (
      (isVisible &&
        <Card >
            <ItemForm isNew={false} open={formOpen} item={item} handleCloseDialog={() => setFormOpen(false)} data={props.data} handleItemUpdate={handleItemUpdate} />

            <CardHeader
              avatar={difficultyChips(difficulty)}
              action={
                <div aria-label="settings">
                  <Button variant="text" onClick={handleEditItem}>Edit</Button>
                  <Button variant="text" onClick={handleDeleteItem}>Delete</Button>
                </div>
              }
              title={title}
              titleTypographyProps={{ variant:'h6' }}
              subheader={dateTime}
            />

            <CardContent>
              {category.map((item, index) => {
                return (<Chip label={item} key={index}/>)
              })}
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon color={isFavourite ? "error" : "disabled"} onClick={handleFavouriteChange} />
              </IconButton>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                    <h3>Link</h3>
                      <p onClick={() => openInNewTab(link)} style={{color: 'blue'}}>{link}</p>
                  </Typography>
                  <Typography paragraph>
                    <h3>Note</h3>
                    {note.split("\n").map((str, i) => <p key={i}>{str}</p>)}
                  </Typography>
                  <Typography>
                    <h3>Personal difficulty</h3>
                    {difficultyChips(personalDifficulty)}
                  </Typography>
                  <Typography>
                    <h3>Time spent</h3>
                    {timeSpent} minutes
                  </Typography>
                </CardContent>
            </Collapse>
        </Card>
      )
    );
}

export default Item;