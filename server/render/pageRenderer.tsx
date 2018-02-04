import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as Helmet from 'react-helmet';
import { Provider } from 'react-redux';

import { RouterContext } from 'react-router';
import analytics from './analytics';

function createApp(store: any, props: any) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>,
  );
}
function stringifyState(state: any): string {
  if (state) {
    return JSON.stringify(state)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
  }
  return '';
}

const buildPage = ({
  componentHTML,
  initialState,
  head,
}: {
  componentHTML: any;
  initialState: any;
  head: any;
}): string => {
  const assetPath = (path: string): string => {
    return process.env.NODE_ENV === 'production' ? process.env.CDN_URL + path : path;
  };
  return `
        <!doctype html>
          <html ${head.htmlAttributes.toString()}>
            <head>
              ${head.title.toString()}
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              ${head.meta.toString()}
              <link rel="author" href="https://plus.google.com/+BrennanMoore" />
              <link rel="stylesheet" href="${assetPath('/assets/styles/main.css')}"/>
              ${head.script.toString()}
            </head>
            <body>
              <div id="app">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${stringifyState(initialState)};</script>
              <script type="text/javascript" charset="utf-8" src="${assetPath(
                '/assets/app.js',
              )}"></script>
              ${analytics}
              <script src="https://use.typekit.net/odn0pxa.js"></script>
              <script>try{Typekit.load({ async: true });}catch(e){}</script>
            </body>
          </html>`;
};

export default (store: any, props: any) => {
  const initialState = store.getState();
  const componentHTML = createApp(store, props);
  const head = Helmet.rewind();
  return buildPage({ componentHTML, initialState, head });
};
