import { getPosts } from "./PostService";

async function main() {
  const posts = await getPosts();
  console.log(posts);
}

main();