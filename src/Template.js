import React from 'react';
import PropTypes from 'prop-types';

const Template = (props) => {
  return (
    <html prefix="og: http://ogp.me/ns#" lang="pt-BR" itemScope itemType="http://schema.org/WebSite">
      <head>
        <title itemProp="name">Criptocurrency exchange system</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index,follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          itemProp="description"
          name="description"
          content="Criptocurrency exchange system"
        />
        <meta
          property="og:url"
          content=""
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Criptocurrency exchange system" />
        <meta
          property="og:description"
          content="Criptocurrency exchange system"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@criptocurrency" />
        <meta
          name="twitter:title"
          content="Criptocurrency exchange system"
        />
        <meta
          name="twitter:description"
          content="Criptocurrency exchange system"
        />
        <style>
          {
            `
              #outlet {
                transition: opacity 0.35s ease-in-out;
                opacity: 0;
              }
            `
          }
        </style>
      </head>
      <body>
        <div id="outlet">
          {props.children}
        </div>
        <script async src="/bundle.js" />
      </body>
    </html>
  );
};

Template.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Template;
