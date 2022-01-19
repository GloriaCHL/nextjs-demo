import { getAllPostIds, getPostDetail } from "../../lib/posts";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { parseISO, format } from "date-fns";

const PostDetail = ({ postData }) => {
  const [data, setData] = useState(3);
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1>{postData.title}</h1>
      <small>{postData.id}</small>
      <p>
        <Date dateString={postData.date} />
      </p>
      <section>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </section>
      <Link href="/">Go Back!</Link>
      <button onClick={fetchHandler}>api test</button>
      <pre>
        <code>{data}</code>
      </pre>
    </div>
  );
};

export default PostDetail;

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const content = await getPostDetail(params.id);
  return {
    props: {
      postData: content,
    },
  };
};

export const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "yyyy/MM/dd")}</time>;
};
