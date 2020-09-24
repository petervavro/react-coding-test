import React from "react";
import { withRouter } from "react-router-dom";  
import { render, fireEvent } from '@testing-library/react'
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from "history";
import PageVotingList from "./index"; 

// This test is inspired by solution at https://medium.com/@aarling/mocking-a-react-router-match-object-in-your-component-tests-fa95904dcc55

export function renderWithRouterMatch(
    ui,
    {
      path = "/",
      route = "/",
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

it('should have 14 people in the list', () => {
  
  const { getAllByTestId, getByTestId } = renderWithRouterMatch(
    PageVotingList, 
    {
      route: "/peter-vavro/voting-list/14",
      path: "/peter-vavro/voting-list/:candidates"
    }
  );

  expect(getAllByTestId("listItem").length).toEqual(14);

});