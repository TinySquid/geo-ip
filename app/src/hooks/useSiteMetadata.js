import { useStaticQuery, graphql } from "gatsby";

export function useSiteMetadata() {
  const { site } = useStaticQuery(
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

  return site.siteMetadata;
}
