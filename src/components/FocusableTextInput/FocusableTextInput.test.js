import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import FocusableTextInput from "./index";

it('text input should be focused', () => {
  
  const { getByText, getByTestId } = render(<FocusableTextInput focused={true} />)
  
  const input = getByTestId('textInput');
  const button = getByText("Set focus");

  expect(input).toBe(document.activeElement);

});

it('text input should be focused after user click on button', () => {
  
  const { getByText, getByTestId } = render(<FocusableTextInput />)
  
  const input = getByTestId('textInput');
  const button = getByText("Set focus");
  
  fireEvent.click(button);

  expect(input).toBe(document.activeElement);

});