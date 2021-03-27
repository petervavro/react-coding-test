import React from 'react';
import { render as returnReactDOM, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from '@testing-library/react';
import FocusableTextInput from "./index";

describe('text input focus', () => {

  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should be focused on mount (without React Testing Library)", () => {
    act(() => {
      returnReactDOM(
        <FocusableTextInput focused={true} />, 
        container
      );
    });
  
    const input = container.querySelector("[data-testid='textInput']")
    expect(input).toBe(document.activeElement);
  
  });
  
  it('should be focused on mount (with React Testing Library)', () => {
    
    const { getByTestId } = render(<FocusableTextInput focused={true} />)
    
    const input = getByTestId('textInput');
  
    expect(input).toBe(document.activeElement);
  
  });
  
  it("should get focused after click (without React Testing Library)", () => {
    act(() => {
      returnReactDOM(
        <FocusableTextInput />, 
        container
      );
    });
  
    const input = container.querySelector("[data-testid='textInput']")
    expect(input).not.toBe(document.activeElement);
  
    const button = document.querySelector("[data-testid='button']");
  
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    expect(input).toBe(document.activeElement);
  
  });
  
  it('should be focused after user click on button (with React Testing Library)', () => {
    
    const { getByText, getByTestId } = render(<FocusableTextInput />)
    
    const input = getByTestId('textInput');
    const button = getByText("Set focus");
    
    fireEvent.click(button);
  
    expect(input).toBe(document.activeElement);
  
  });

})