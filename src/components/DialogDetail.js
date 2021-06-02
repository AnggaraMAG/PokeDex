import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ handleClose, open, namePokemon }) {
  const [dataDetail, setDataDetail] = useState([])

  const getData = async (namePokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
    console.log(`urrrl`, url)
    const result = await axios.get(url).then((res) => res).catch((err) => err.response)
    const data = result.data
    setDataDetail(data)
    console.log(`result`, result.data)
  }
  useEffect(() => {
    getData(namePokemon)
  }, [namePokemon])

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={dataDetail.sprites && dataDetail.sprites.front_default} style={{ width: 150, height: 150 }} />
              </ListItemAvatar>
              <ListItemText primary={
                <React.Fragment>
                  <Typography
                    component="h4"
                    variant="body2"
                    color="textPrimary"
                  >
                    <b>#{dataDetail.order}</b>
                  </Typography>
                  <Typography
                    component="h1"
                    variant="body2"
                    color="textPrimary"
                  >
                    <h3 style={{ color: 'tomato' }}>{dataDetail.name}</h3>
                  </Typography>
                </React.Fragment>
              }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Base exp :{dataDetail.base_experience}
                    </Typography><br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Weight :{dataDetail.weight}
                    </Typography><br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Height :{dataDetail.height}
                    </Typography>
                  </React.Fragment>
                } />
            </ListItem>
          </List>
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
            direction="row"
          >
            <Grid xs={8}>
              <h4 style={{ color: 'tomato', marginBottom: 0 }}>Stats</h4>
              {(dataDetail && dataDetail.stats) && dataDetail.stats.map((n) => {
                // console.log(`stats`, n.stat.name)
                return (
                  <p style={{ margin: 0, marginTop: 5 }} key={n.id}>{n.stat.name} : {n.base_stat}</p>
                )
              })}

              <h4 style={{ color: 'tomato', marginBottom: 0 }}>Types</h4>
              {(dataDetail && dataDetail.types) && dataDetail.types.map((n) => {
                console.log(`type`, n)
                return (
                  <p style={{ margin: 0, marginTop: 5 }} key={n.id}>{n.type.name}</p>
                )
              })}
              <h4 style={{ color: 'tomato', marginBottom: 0 }}>Abilities</h4>
              {(dataDetail && dataDetail.abilities) && dataDetail.abilities.map((n) => {
                console.log(`ability`, n)
                return (
                  <p style={{ margin: 0, marginTop: 5 }} key={n.id}>{n.ability.name}</p>
                )
              })}
            </Grid>
            <Grid xs={4}>
              <h4 style={{ color: 'tomato', marginBottom: 0 }}>Moves</h4>
              {(dataDetail && dataDetail.moves) && dataDetail.moves.map((n) => {
                // console.log(`moves`, n)
                return (
                  <p style={{ margin: 0, marginTop: 5 }} key={n.id}>{n.move.name}</p>
                )
              })}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
