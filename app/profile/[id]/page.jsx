"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/users/" + params?.id + "/posts");
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc={
        "Welcome to " +
        username +
        "'s profile page. Explore and be inspired by their prompts."
      }
      data={posts}
    />
  );
};

export default UserProfile;
