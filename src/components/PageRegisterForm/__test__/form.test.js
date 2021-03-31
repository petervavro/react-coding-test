import React from "react";
import { render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageRegisterForm, { ERROR_MESSAGES } from "../PageRegisterForm";
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from "history";

// This test is inspired by solution at https://medium.com/@aarling/mocking-a-react-router-match-object-in-your-component-tests-fa95904dcc55
export function renderWithRouterMatch(
  ui
) {
  return {
    ...render(
      <Router history={createMemoryHistory({ initialEntries: [`/peter-vavro/register-form`] })}>
        <Route path={"/peter-vavro/register-form"} component={ui} />
      </Router>
    )
  };
}

const setup = () => {

  const utils = renderWithRouterMatch(
    PageRegisterForm
  );

  const { getByText, getByLabelText } = utils;

  userEvent.type(
    getByLabelText(/username/i), 
    'userName'
  );

  userEvent.type(
    getByLabelText(/email/i), 
    'abc@abc.de'
  );

  userEvent.type(
    getByLabelText(/Phone number/i), 
    '3121231234'
  );

  const button = getByText(/Submit/i);

  return {
    button,
    ...utils
  };
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ "status": true })
  })
);

beforeEach(() => {
  fetch.mockClear()
});

afterEach(() => {
  global.fetch.mockRestore()
});

describe('form on submit', () => {

  it('should not submit form', async () => {

    const { getByText } = renderWithRouterMatch(
      PageRegisterForm
    );

    const button = getByText(/Submit/i);

    await waitFor(
      () => fireEvent.click(button)
    );

    await waitFor(
      () => expect(fetch).toHaveBeenCalledTimes(0)
    );

  });

  it('should display error status message received from API', async () => {
  
    const SUCCESSFUL_RESPONSE_WITH_FALSE_STATUS = { status: false, message: "Phone number already in use." };
    
    fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(SUCCESSFUL_RESPONSE_WITH_FALSE_STATUS)
    }));

    const { button, queryByText } = setup();

    await waitFor(
      () => fireEvent.click(button)
    );

    await waitFor(
      () => expect(fetch).toHaveBeenCalledTimes(1)
    );

    await waitFor(
      async () => expect(
        await queryByText(SUCCESSFUL_RESPONSE_WITH_FALSE_STATUS.message)
      ).toBeInTheDocument()
    );

  });

  it('should display generic error message due to API failure', async () => {

    const MSG = ERROR_MESSAGES.submitError();

    fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.reject()
    }));

    const { button, queryByText } = setup();

    await waitFor(
      () => fireEvent.click(button)
    );

    await waitFor(
      () => expect(fetch).toHaveBeenCalledTimes(1)
    );

    await waitFor(
      async () => expect(
        await queryByText(MSG)
      ).toBeInTheDocument()
    );

  });

  it.todo('should redirect to Welcome page');

})
