import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "pages/posts");

export const getStortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames
    .filter((i) => i.indexOf(".md") !== -1)
    .map((i) => {
      const id = i.replace(/\.md$/, "");
      const fullPath = path.join(postsDir, i);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        id,
        ...matterResult.data,
      };
    });
  return allPostsData.sort(({ data: a }, { data: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getAllPostIds = () => {
  const fns = fs.readdirSync(postsDir);
  // 每个对象都必须有params密钥并包含一个带有id密钥的对象（因为我们[id]在文件名中使用）。否则，getStaticPaths 将失败。
  return fns
    .filter((i) => i.indexOf(".md") !== -1)
    .map((i) => ({ params: { id: i.replace(/\.md$/, "") } }));
};

export const getPostDetail = async (id) => {
  const fullPath = path.join(postsDir, `${id}.md`);
  const detail = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(detail);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    ...matterResult.data,
    contentHtml,
  };
};
