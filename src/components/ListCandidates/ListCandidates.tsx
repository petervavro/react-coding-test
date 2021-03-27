import React, { memo, useMemo } from 'react';
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
    items: CandidateProps[],
    onChangeVotes: HandleVotingFunc,
    selectedId: string,
}

const ListCandidates = ({ 
    items, 
    onChangeVotes,
    selectedId,
} : ListCandidatesProps) => {

    const classes = useStyles();

    /**
     * Sort list to for render
     */
    const sortedCandidates = useMemo(
    () => items
        .sort(
            (a, b) => {
                const aVotes = a.votes;
                const bVotes = b.votes;

                const aAge = a.age;
                const bAge = b.age;

                if (aVotes === bVotes) {
                    return (aAge < bAge ? -1 : ( aAge > bAge ? 1 : 0 ));
                } else {
                    return (aVotes < bVotes ? -1 : 1);
                }
            }
        ).reverse(), 
    [items]
);

    return (
        <List data-testid="list">
            {sortedCandidates.map(
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
                            <small aria-label="votes">{votes}</small>
                        </ListItemAvatar>
                        <ListItemText secondary={slogan}>
                            <>{`${firstname} ${lastname}, `}</>
                            <span aria-label="age">{age}</span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <>
                            <IconButton
                                size={'small'}
                                onClick={onChangeVotes(id, 1)}
                                aria-label="up"
                            >
                                <UpIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                size={'small'}
                                onClick={onChangeVotes(id, -1)}
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
    items: PropTypes.array,
    onChangeVotes: PropTypes.func,
    selectedId: PropTypes.string
};

export default memo(ListCandidates);