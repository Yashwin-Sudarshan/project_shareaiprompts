"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const DarkModeToggleButton = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <div className="relative inline-block w-12 h-6 bg-gray-300 dark:bg-orange-400 rounded-full">
      <input
        type="checkbox"
        id="switch"
        className="absolute top-0 left-0 w-0 h-0 opacity-0"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label
        htmlFor="switch"
        className="flex items-center justify-center w-6 h-6 absolute top-0 left-0 cursor-pointer"
      >
        <div
          className={`${
            isDarkMode ? "-translate-x-0" : "translate-x-6"
          } transform`}
        >
          {isDarkMode ? (
            <Image
              src={"/assets/icons/moon.svg"}
              width={12}
              height={12}
              alt="Dark mode toggle button moon"
              className="w-4 h-4 text-gray-600 dark:text-gray-300"
            />
          ) : (
            <Image
              src={"/assets/icons/sun.svg"}
              width={12}
              height={12}
              alt="Dark mode toggle button sun"
              className="w-4 h-4 text-yellow-400"
            />
          )}
        </div>
      </label>
    </div>
  );
};

const Nav = ({ toggleDarkMode, isDarkMode }) => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="ShareAIPrompts Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">ShareAIPrompts</p>
      </Link>

      <DarkModeToggleButton
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />

      {/** Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/** Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
