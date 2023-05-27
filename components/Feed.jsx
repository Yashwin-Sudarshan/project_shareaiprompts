"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const [posts, setPosts] = useState([]);

  const filterSearchResults = (searchText) => {
    const searchTextRegex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        searchTextRegex.test(post.creator.username) ||
        searchTextRegex.test(post.prompt) ||
        searchTextRegex.test(post.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(debounceTimeout);
    setSearchText(e.target.value);

    setDebounceTimeout(
      setTimeout(() => {
        const filteredPosts = filterSearchResults(e.target.value);
        setFilteredSearchResults(filteredPosts);
      }, 300)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const filteredPosts = filterSearchResults(tag);
    setFilteredSearchResults(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, username, or prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={filteredSearchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
