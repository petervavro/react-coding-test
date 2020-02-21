import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import PageHome from './components/PageHome';
import PageNoPage from './components/PageNoPage';

/* Styles */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

function App() {

  const classes = useStyles();

  return (
    <Router>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper className={classes.paper} >
                <Switch>
                  <Route path="/" exact component={PageHome} />
                  <Route path="*" component={PageNoPage} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
