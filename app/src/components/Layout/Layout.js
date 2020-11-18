// React
import React from "react";
import { Helmet } from "react-helmet";

// Hooks
import { useSiteMetadata } from "../../hooks/useSiteMetadata";

// Style
import "./normalize.css";

export default function Layout({ children }) {
  const site = useSiteMetadata();

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
        title={site.title}
        meta={[
          {
            name: "description",
            content: site.description,
          },
        ]}
      />
      {children}
    </>
  );
}
