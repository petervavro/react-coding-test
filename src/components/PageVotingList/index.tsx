import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PageLayout from '../PageLayout';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/ExpandLess';
import DownIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Chance from 'chance';
const chance = new Chance();

interface CandidateProps {
    firstname: string;
    lastname: string;
    age: number;
    slogan: string;
    votes: number;
    id: number;
}

type CustomRouteParams = {
    candidates: string;
};

const useStyles = makeStyles(() =>
    createStyles({
        highlighted: {
            color: 'red',
        },
    }),
);

/**
 * Generator of candidates
 * @returns {CandidateProps}
 */
const generateCandidate = () : CandidateProps => {
    return {
        id: chance.integer(),
        firstname: chance.first(),
        lastname: chance.last(),
        age: chance.age({ type: 'adult' }),
        slogan: chance.sentence({ words: 10 }),
        votes: chance.integer({ min: 0, max: 10 }),
    };
};

/**
 * Generate list of candidates
 * @param {number} amount set amount of candidates
 * @returns {CandidateProps[]}
 */
function generateListOfCandidates(amount: number): Array<CandidateProps> {
    const candidates = [];

    for (let i = 0; i < amount; i += 1) {
        candidates.push({
            ...generateCandidate(),
        });
    }

    return candidates;
}

/**
 * Handler to modify votes
 * @param {CandidateProps} candidate
 * @param {number} valueToAdd
 * @returns {CandidateProps}
 */
const modifyVotes = (candidate: CandidateProps, valueToAdd: number) => {
    // Votes to update
    const votes = candidate.votes + valueToAdd;

    // Limit range
    if (votes >= 0 && votes <= 20) {
        return {
            ...candidate,
            votes: candidate.votes + valueToAdd,
        };
    }

    return candidate;
};

function PageVotingList({ match } : RouteComponentProps<CustomRouteParams>) {
    const classes = useStyles();

    // State : "candidates"
    const [candidates, setCandidates] = useState<Array<CandidateProps>>([]);

    // State : "lastUpdated"
    const [lastUpdated, setLastUpdated] = useState<number>(0);

    useEffect(() => {

        // Set candidates in state
        setCandidates(
            generateListOfCandidates(
                parseInt(match.params.candidates, 10)
            )
        );

        // Reset last updated item selector
        setLastUpdated(0);
    }, [match.params.candidates]);

    /**
     * Handle adding/removing votes
     * @param {number} index
     * @param {number} step
     * @returns {Function}
     */
    const handleMove = useCallback(
        (index: number, step : number = 1 ) => {
            return () => {

                setCandidates([
                    ...candidates.slice(0, index),
                    modifyVotes(candidates[index], step),
                    ...candidates.slice(index + 1),
                ]);
    
                // Set last updated
                setLastUpdated(candidates[index].id);
            }
        },
        [candidates],
    );

    /**
     * Sort list to for render
     */
    const sortedCandidates = useMemo(
        () => candidates
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
        [candidates]
    );

    /**
     * Get total votes amount
     */
    const totalVotes = useMemo(
        () => candidates
        .reduce(
            (accumulator, currentValue) => (accumulator + currentValue.votes), 
            0
        ),
        [candidates]
    );

    return (
        <PageLayout title={'Voting List'}>
            <Box p={2}>
                <Typography variant="body1" gutterBottom={false} display="inline">
                    Total votes : <span className={classes.highlighted}>{totalVotes}</span>
                </Typography>
            </Box>
            <Divider />
            <List>
                {sortedCandidates.map(
                    ({ 
                        firstname, 
                        lastname, 
                        age, 
                        slogan, 
                        votes, 
                        id 
                    }, i) => {
                        return (
                            <ListItem key={id} className={id === lastUpdated ? classes.highlighted : ''}>
                                <ListItemAvatar>
                                    <small>{votes}</small>
                                </ListItemAvatar>
                                <ListItemText secondary={slogan}>
                                    <>{`${firstname} ${lastname}, ${age}`}</>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        size={'small'}
                                        onClick={handleMove(i, 1)}
                                        aria-label="up"
                                    >
                                        <UpIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        size={'small'}
                                        onClick={handleMove(i, -1)}
                                        aria-label="down"
                                    >
                                        <DownIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                )}
            </List>
            <Divider />
            <Box p={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/peter-vavro/voting-list/${chance.integer({ min: 5, max: 16 })}`}
                    replace
                >
                    Recreate the list with a random candidates amount
                </Button>
            </Box>
        </PageLayout>
    );
}

export default PageVotingList;
