export default function error404() {
  if (typeof window !== "undefined") {
    window.location.replace(process.env.GATSBY_APP_HREF);
  }

  return null;
}
