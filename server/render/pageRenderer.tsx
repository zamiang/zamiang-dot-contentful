import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import * as Helmet from 'react-helmet';
import { RouterContext } from 'react-router';
import analytics from './analytics';

function createApp(store: any, props: any) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
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

const buildPage = ({ componentHTML, initialState, head }: { componentHTML: any, initialState: any, head: any }): string => {
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
              ${head.link.toString()}
              <link rel="stylesheet" href="${assetPath('/assets/styles/main.css')}"/>
              ${head.script.toString()}
            </head>
            <body>
              <div id="app">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${stringifyState(initialState)};</script>
              <script type="text/javascript" charset="utf-8" src="${assetPath('/assets/app.js')}"></script>
              <script src="//app-ab15.marketo.com/js/forms2/js/forms2.min.js"></script>
              <script>
              MktoForms2.loadForm("//app-ab15.marketo.com", "084-AUJ-134", 1088, function(form) {
                form.vals({"Unbounce Page Variant":window.location.href});
                document.getElementsByName('Email').forEach((item) => {
                  item.placeholder = 'Email';
                });
                form.onSuccess(function(values, followUpUrl) {
                  form.getFormElem().addClass('success').text('Thanks for signing up!');
                  return false;
                });
              });
              </script>
              <script>
              MktoForms2.loadForm("//app-ab15.marketo.com", "084-AUJ-134", 1089, function(form) {
                form.vals({"Unbounce Page Variant":window.location.href});
                document.getElementsByName('Email').forEach((item) => {
                  item.placeholder = 'Email';
                });
              });
              </script>
              <style>
                .mktoForm { padding: 0px !important; }
                .mktoOffset, .mktoGutter { display: none; }
                .mktoButtonWrap { margin-left: 0px !important; }
                .mktoFormRow {
                  display: inline-block;
                  vertical-align: top;
                  margin-right: 21px !important;
                  width: calc(100% - 150px) !important;
                }
                .mktoButtonRow { width: 122px !important; }
                footer .mktoFormRow { max-width: 290px; }
                .mktoForm.success input { display: none !important; }
                .mktoForm.success {
                  font-size: 16px;
                  font-family: 'GT-Walsheim-Regular', Helvetica, Arial, sans-serif;
                  line-height: 122%;
                }
                @media (max-width: 800px) {
                  .mktoFormRow {
                    width: calc(100%) !important;
                    margin-right: 0px !important;
                    max-width: 400px;
                  }
                  .mktoButtonRow {
                    width: 100% !important;
                    margin-top: 12px !important;
                  }
                }
              </style>
              ${analytics}
            </body>
          </html>`;
};

export default (store: any, props: any) => {
  const initialState = store.getState();
  const componentHTML = createApp(store, props);
  const head = Helmet.rewind();
  return buildPage({ componentHTML, initialState, head });
};
