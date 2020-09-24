import React, { memo } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/ExpandLess';
import DownIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { CandidateProps, HandleVotingFunc } from 'components/PageVotingList/types';

const useStyles = makeStyles((theme) =>
    createStyles({
        highlighted: {
            color: theme.palette.secondary.main,
        },
    }),
);

export interface ListCandidatesProps {
    candidates: CandidateProps[],
    handleVoting: HandleVotingFunc,
    selectedId: string,
}

const ListCandidates = ({ 
    candidates, 
    handleVoting,
    selectedId,
} : ListCandidatesProps) => {

    const classes = useStyles();

    return (
        <List>
            {candidates.map(
                ({
                    firstname, 
                    lastname, 
                    age, 
                    slogan, 
                    votes, 
                    id 
                }) => (
                    <ListItem key={id} className={id === selectedId ? classes.highlighted : ''}  data-testid="listItem">
                        <ListItemAvatar>
                            <small>{votes}</small>
                        </ListItemAvatar>
                        <ListItemText secondary={slogan}>
                            <>{`${firstname} ${lastname}, ${age}`}</>
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <>
                            <IconButton
                                size={'small'}
                                onClick={handleVoting(id, 1)}
                                aria-label="up"
                            >
                                <UpIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                size={'small'}
                                onClick={handleVoting(id, -1)}
                                aria-label="down"
                            >
                                <DownIcon />
                            </IconButton>
                            </>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            )}
        </List>
    );
};

ListCandidates.propTypes = {
    candidates: PropTypes.array,
    handleVoting: PropTypes.func,
    selectedId: PropTypes.string
};

export default memo(ListCandidates);