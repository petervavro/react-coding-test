/* eslint-disable react/prop-types */
import React from "react";
import { render, fireEvent, within, waitFor } from '@testing-library/react'
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from "history";
import PageVotingList from "./index";

const LIST_LENGTH = 3

// This test is inspired by solution at https://medium.com/@aarling/mocking-a-react-router-match-object-in-your-component-tests-fa95904dcc55
export function renderWithRouterMatch(
    ui,
    {
      path = "/peter-vavro/voting-list/:candidates",
      route = `/peter-vavro/voting-list/${LIST_LENGTH}`,
      history = createMemoryHistory({ initialEntries: [route] })
    } = {}
  ) {
    return {
      ...render(
        <Router history={history}>
          <Route path={path} component={ui} />
        </Router>
      )
    };
  }

jest.mock("components/ListCandidates", () => {
  return function DummyListCandidates({items, onChangeVotes}) {
    return (
      <ul aria-label="candidates">
        {items.map(
          (item) => (
            <li key={item.id} id={item.id}>
              {item.id}
              <span data-testid="votes">{item.votes}</span>
              <button onClick={onChangeVotes(item.id, 1)} aria-label="up">Up</button>
              <button onClick={onChangeVotes(item.id, -1)} aria-label="down">Down</button>
            </li>
          )
        )}
      </ul>
    );
  };
});

describe('list', () => {
  it('should generate new list', async () => {

    const { getByText, getAllByRole } = renderWithRouterMatch(
      PageVotingList
    );

    const prevItems = getAllByRole('listitem');

    fireEvent.click(
      getByText('Recreate the list with a random candidates amount')
    );

    await waitFor(() => expect(
      getAllByRole('listitem')
    ).not.toEqual(prevItems))

  })
})

describe('list item votes', () => {

  it('should add vote and the value should not be more than 20', () => {
    const { getAllByRole } = renderWithRouterMatch(
      PageVotingList
    );
    
    const items = getAllByRole('listitem');

    let positionToTest = 0;
    let item = {};
    let prevItemVotes = 0;

    do {

      item = within(items[positionToTest++]);
      prevItemVotes = Number(item.getByTestId("votes").textContent);

    } while (
      prevItemVotes === 0 
      && positionToTest < (items.length - 1)
    )

    expect(
      prevItemVotes
    ).not.toEqual(0);

    const { getByRole } = item;

    const btn = getByRole('button', {
      name: /up/i,
    })

    while (prevItemVotes < 20) {
      fireEvent.click(btn);
      prevItemVotes = Number(item.getByTestId("votes").textContent);
    }

    fireEvent.click(btn);

    expect(
      Number(item.getByTestId("votes").textContent)
    ).toEqual(20);

    fireEvent.click(btn); 

    expect(
      Number(item.getByTestId("votes").textContent)
    ).toEqual(20);

  })

  it('should subtract vote and the value should not be less than 0', () => {
    const { getAllByRole } = renderWithRouterMatch(
      PageVotingList
    );
    
    const items = getAllByRole('listitem');

    let positionToTest = 0;
    let item = {};
    let prevItemVotes = 0;

    do {

      item = within(items[positionToTest++]);
      prevItemVotes = Number(item.getByTestId("votes").textContent);

    } while (
      prevItemVotes === 0 
      && positionToTest < (items.length - 1)
    )

    expect(
      prevItemVotes
    ).not.toEqual(0);

    const { getByRole } = item;

    const btn = getByRole('button', {
      name: /down/i,
    })

    while (prevItemVotes > 0) {
      fireEvent.click(btn);
      prevItemVotes = Number(item.getByTestId("votes").textContent);
    }

    fireEvent.click(btn); 

    expect(
      Number(item.getByTestId("votes").textContent)
    ).toEqual(0);

    fireEvent.click(btn); 

    expect(
      Number(item.getByTestId("votes").textContent)
    ).toEqual(0);

  })

})

describe('total votes', () => {

  it('total value should be equal to sum of votes', () => {
  
    const { getByTestId, getAllByTestId } = renderWithRouterMatch(
      PageVotingList
    );
  
    const sum = getAllByTestId("votes").reduce(
      (acc, e) => {
        return acc + Number(e.textContent)
      }, 
      0
    );
  
    expect(
      getByTestId('totalVotes').textContent
    ).toBe(`${sum}`);
  
  })

})
