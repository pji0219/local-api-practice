const App = ({ Component, pageProps }) => <Component {...pageProps} />;

App.getInitialProps = async ({ context, Component }) => {
  const pageProps = await Component.getInitialProps?.(context);
  return { pageProps };
}

export default App;