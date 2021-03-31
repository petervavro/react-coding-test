/* eslint-disable react/prop-types */
import React from "react"
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PageRegisterForm, { ERROR_MESSAGES } from "../PageRegisterForm"
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from "history"

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
  }
}

const setup = (label) => {

  const utils = renderWithRouterMatch(
    PageRegisterForm
  );

  const input = utils.getByLabelText(label);

  return {
    input,
    ...utils,
  };
};

describe('form input username', () => {

  it('should display error message about requirements for characters in value', async () => {

    const MSG = ERROR_MESSAGES.onlyAlphanumericChars();

    const { input } = setup(/username/i);

    userEvent.type(
      input, 
      'abcdefgh @!-\'&$?{}[]'
    );

    await waitFor(
      () => input.blur()
    );

    expect(
      screen.queryByText(
        MSG
      )
    ).toBeInTheDocument();

  });

  it('should display error message about minimum string length in value', async () => {

    const MSG = ERROR_MESSAGES.minlength(4);

    const { input } = setup(/username/i);

    userEvent.type(
      input, 
      'ab1'
    );

    await waitFor(
      () => input.blur()
    );

    expect(
      screen.queryByText(
        MSG
      )
    ).toBeInTheDocument();

  });

  it('should display error message about maximum string length in value', async () => {

    const MSG = ERROR_MESSAGES.maxlength(20);

    const { input } = setup(/username/i);

    userEvent.type(
      input, 
      'abcdefghij1234567890'
    );

    await waitFor(
      () => input.blur()
    );

    expect(
      screen.queryByText(
        MSG
      )
    ).not.toBeInTheDocument();

    userEvent.type(
      input, 
      'a'
    );

    await waitFor(
      () => input.blur()
    );

    expect(
      screen.queryByText(
        MSG
      )
    ).toBeInTheDocument();

  });

})

describe('form input for email', () => {

  const MSG = ERROR_MESSAGES.invalidEmail()

  it('should not display error message', async () => {

    const { input } = setup(/email/i);

    await waitFor(
      () => input.focus()
    );

    userEvent.type(
      input, 
      'abcd@dfg.de'
    );

    await waitFor(
      () => input.blur()
    );

    expect(
      screen.queryByText(
        MSG
      )
    ).not.toBeInTheDocument();
  })

  it('should display error message about invalid email address', async () => {

    const { input } = setup(/email/i);

    await waitFor(
      () => input.focus()
    );

    userEvent.type(
      input, 
      'abcddefgh'
    );

    await waitFor(
      () => input.blur()
    );

    expect(
      screen.queryByText(
        MSG
      )
    ).toBeInTheDocument();

  })

})

describe('form input for phone number', () => {

  const MSG = ERROR_MESSAGES.phoneNumberRangeRestriction();

  const numbersToTest = [
    ['1234567890'],
    ['123456'],
  ];

  test.each(numbersToTest)(
    'shows an error message for wrong phone number format: %i', 
    async (phoneNumber) => {

      const { input } = setup(/Phone number/i);

      await waitFor(
        () => input.focus()
      );

      userEvent.type(
        input, 
        phoneNumber
      );

      await waitFor(
        () => input.blur()
      );

      expect(
        input.value
      ).not.toMatch(/^[(]{1}(30[0-9]|31[0-9]|320)[)]{1}\s\d{3}\s\d{4}$/);

      await waitFor(
        async () => expect(
          await screen.queryByText(MSG)
        ).toBeInTheDocument()
      );

    });

});
