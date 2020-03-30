import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/ExpandLess';
import DownIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Chance from 'chance';
const chance = new Chance();

interface CandidateProps {
    firstname: string;
    lastname: string;
    age: number;
    slogan: string;
    votes: number;
    index: number;
}

type CustomParams = {
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
 */
const generateCandidate = () => {
    return {
        firstname: chance.first(),
        lastname: chance.last(),
        age: chance.age({ type: 'adult' }),
        slogan: chance.sentence({ words: 10 }),
        votes: chance.integer({ min: 0, max: 10 }),
    };
};

/**
 * Generate list of candidates
 * @param amount set amount of candidates
 */
function generateListOfCandidates(amount: number): Array<CandidateProps> {
    const candidates = [];

    for (let i = 0; i < amount; i += 1) {
        candidates.push({
            ...generateCandidate(),
            index: i,
        });
    }

    return candidates;
}

/**
 * Handler to modify votes
 * @param candidate
 * @param valueToAdd
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

function PageVotingList({ match }: RouteComponentProps<CustomParams>) {
    const classes = useStyles();

    // State : "candidates"
    const [candidates, setCandidates] = useState<Array<CandidateProps>>([]);

    // State : "lastUpdated"
    const [lastUpdated, setLastUpdated] = useState();

    useEffect(() => {
        setCandidates(generateListOfCandidates(parseInt(match.params.candidates, 10)));
    }, [match.params.candidates]);

    // Sort list to for render
    const sortedCandidates = candidates
        .sort(function (a, b) {
            const aVotes = a.votes;
            const bVotes = b.votes;

            const aAge = a.age;
            const bAge = b.age;

            if (aVotes === bVotes) {
                return aAge < bAge ? -1 : aAge > bAge ? 1 : 0;
            } else {
                return aVotes < bVotes ? -1 : 1;
            }
        })
        .reverse();

    return (
        <PageLayout title={'Voting List'}>
            <Box p={2}>
                <Link
                    component={RouterLink}
                    to={`/peter-vavro/voting-list/${chance.integer({ min: 5, max: 16 })}`}
                    replace
                >
                    Recreate the list with a random candidates count
                </Link>
            </Box>
            <Divider />
            <ul>
                {sortedCandidates.map(({ firstname, lastname, age, slogan, votes, index }, i) => {
                    return (
                        <li key={`cnd-${i}`} className={index === lastUpdated ? classes.highlighted : ''}>
                            <IconButton
                                onClick={() => {
                                    // Add one vote
                                    setCandidates([
                                        ...candidates.slice(0, i),
                                        modifyVotes(candidates[i], 1),
                                        ...candidates.slice(i + 1),
                                    ]);

                                    // Set last updated
                                    setLastUpdated(index);
                                }}
                                aria-label="up"
                            >
                                <UpIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    // Subtract one vote
                                    setCandidates([
                                        ...candidates.slice(0, i),
                                        modifyVotes(candidates[i], -1),
                                        ...candidates.slice(i + 1),
                                    ]);

                                    // Set last updated
                                    setLastUpdated(index);
                                }}
                                aria-label="down"
                            >
                                <DownIcon />
                            </IconButton>
                            <strong>{`${firstname} ${lastname}`}</strong>, {age}, {slogan}, {votes}
                        </li>
                    );
                })}
            </ul>
        </PageLayout>
    );
}

export default PageVotingList;
