import axios from "axios";

export const getSubreddit = async (req, res) => {
  try {
    const baseUrl = "https://www.reddit.com";
    const { subreddit } = req.params;
    const { limit } = req.query;
    console.log(subreddit);
    const { data } = await axios.get(
      `${baseUrl}/r/${subreddit}/top.json?limit=${limit || 10}`
    );
    const posts = data.data.children.slice(
      0,
      limit || data.data.children.length
    );
    const simplifiedPosts = posts.map((post) => ({
      id: post.data.name,
      subreddit_name_prefixed: post.data.subreddit_name_prefixed,
      title: post.data.title,
      author: post.data.author,
      ups: post.data.ups,
      num_comments: post.data.num_comments,
      url: baseUrl + post.data.permalink,
      text: post.data.selftext,
    }));
    res.send(simplifiedPosts);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "Subreddit not found" });
  }
};
