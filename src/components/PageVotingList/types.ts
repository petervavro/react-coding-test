export interface CandidateProps {
    firstname: string;
    lastname: string;
    age: number;
    slogan: string;
    votes: number;
    id: string;
}

export interface HandleVotingFunc {
    (id: string, step: number ) : () => void
}

export type CustomRouteParams = {
    candidates: string;
};