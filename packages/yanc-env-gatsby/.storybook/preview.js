// add global parameters and decorators.
import React from 'react';
import { action } from "@storybook/addon-actions"
import { MockedProvider } from '@apollo/client/testing'; // Use for Apollo Version 3+
import { wrapPageElement } from '../src/libs/wrap-page-element';

// root scss from src styles
import "../src/styles/style.scss";

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
};

//
// Global decorators
//
export const decorators = [
  (Story) => (
    React.createElement(
      wrapPageElement,
      {
        element: React.createElement(Story),
        props:{
          pageContext: { locale: "ko" },
          location: window.location,
        },
      }
    )
  ),
];