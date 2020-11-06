// React
import React from "react";
import { Helmet } from "react-helmet";

// Gatsby
import { useStaticQuery, graphql } from "gatsby";

// Style
import "./normalize.css";

export default function Layout({ children }) {
  const query = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
        title={query.site.siteMetadata.title}
        meta={[
          {
            name: "description",
            content: query.site.siteMetadata.description,
          },
        ]}
      />
      {children}
    </>
  );
}
