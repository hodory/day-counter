import DateContext from "../context/DateContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DateContext.Provider>
      <Component {...pageProps} />
    </DateContext.Provider>
  );
}

export default MyApp;
