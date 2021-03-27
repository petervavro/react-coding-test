import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PageLayout from 'components/PageLayout';
import ListCandidates from 'components/ListCandidates';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Chance from 'chance';
import { CandidateProps, CustomRouteParams } from './types';

const chance = new Chance();

const useStyles = makeStyles((theme) =>
    createStyles({
        highlighted: {
            color: theme.palette.secondary.main,
        },
    }),
);

/**
 * Generator of candidates
 * @returns {CandidateProps}
 */
const generateCandidate = () : CandidateProps => {
    return {
        id: chance.guid(),
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
 * Get updated amount of voters
 * @param {number}      currentVotes    Actual amount of votes of candidate
 * @param {number}      valueToAdd      Value to add
 * @returns {number}                    New amount of votes
 */
const updateVotes = (currentVotes: number, valueToAdd: number) => {

    // Votes to update
    const votes = currentVotes + valueToAdd;

    // Limit range
    if (votes >= 0 && votes <= 20) return votes

    return currentVotes;
};

function PageVotingList({ match } : RouteComponentProps<CustomRouteParams>) {
    const classes = useStyles();

    // State : "candidates"
    const [candidates, setCandidates] = useState<Array<CandidateProps>>([]);

    // State : "lastUpdated"
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {

        // Set candidates in state
        setCandidates(
            generateListOfCandidates(
                parseInt(match.params.candidates, 10)
            )
        );

        // Reset last updated item selector
        setLastUpdated('');

    }, [match.params.candidates]);

    /**
     * Handle adding/removing votes
     * @param {number} index
     * @param {number} step
     * @returns {Function}
     */
    const handleVoting = useCallback(
        (id, step = 1 ) => {
            return () => {

                const index = candidates.findIndex(item => item.id === id);

                setCandidates([
                    ...candidates.slice(0, index),
                    {
                        ...candidates[index],
                        votes: updateVotes(candidates[index].votes, step),
                    },
                    ...candidates.slice(index + 1),
                ]);
    
                // Set last updated
                setLastUpdated(candidates[index].id);
            }
        },
        [candidates],
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
        <PageLayout title={'Voting List'} data-testid="listItem">
            <Box p={2}>
                <Typography variant="body1" gutterBottom={false} display="inline">
                    Total votes: <span className={classes.highlighted} data-testid="totalVotes">{totalVotes}</span>
                </Typography>
            </Box>
            <Divider />
            <ListCandidates 
                items={candidates}
                onChangeVotes={handleVoting} 
                selectedId={lastUpdated}
            />
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
