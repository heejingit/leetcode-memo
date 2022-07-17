import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import Chip from './Chip';
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
    const [expanded, setExpanded] = React.useState(false);
    const item = props.item;
    const index = props.index;
    const [isFavourite, setFavourite] = React.useState(item.isFavourite);
    const [isVisible, setVisible] = React.useState(true);

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleFavouriteChange = () => {
      if (window.confirm("test")) {
        setFavourite(!isFavourite);
        DataManager.setFavourite(item.id, !isFavourite);
      }
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
            <CardHeader
              avatar={difficultyChips(item.difficulty)}
              action={
                <div aria-label="settings">
                  <Button variant="text">Edit</Button>
                  <Button variant="text" onClick={handleDeleteItem}>Delete</Button>
                </div>
              }
              title={item.title}
              titleTypographyProps={{ variant:'h6' }}
              subheader={item.dateTime}
            />

            <CardContent>
              {item.category.map((item, index) => {
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
                      <p onClick={() => openInNewTab(item.link)} style={{color: 'blue'}}>{item.link}</p>
                  </Typography>
                  <Typography paragraph>
                    <h3>Note</h3>
                    {item.note.split("\n").map((str, i) => <p key={i}>{str}</p>)}
                  </Typography>
                  <Typography>
                    <h3>Personal difficulty</h3>
                    {difficultyChips(item.personalDifficulty)}
                  </Typography>
                  <Typography>
                    <h3>Time spent</h3>
                    {item.timeSpent} minutes
                  </Typography>
                </CardContent>
            </Collapse>
        </Card>
      )
    );
}

export default Item;