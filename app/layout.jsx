"use client";

import "@styles/globals.css";

import { useEffect } from "react";
import useDarkMode from "@utils/useDarkMode";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

// export const metadata = {
//   title: "Share AI Prompts",
//   description: "Discover & Share AI Prompts",
// };

const RootLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="en">
      <head>
        <meta title="Share AI Prompts" content="Discover & Share AI Prompts" />
        <body>
          <Provider>
            <div className={`main ${isDarkMode ? "dark" : ""}`}>
              <div className="gradient" />
            </div>
            <main className={`app ${isDarkMode ? "dark" : ""}`}>
              <Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
              {children}
            </main>
          </Provider>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
