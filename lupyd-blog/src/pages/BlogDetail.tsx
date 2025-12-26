import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) return <p>Blog not found</p>;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{blog.title}</h1>

      <img
        src={blog.image}
        alt={blog.title}
        className="blog-hero"
      />

      <pre style={{ whiteSpace: "pre-wrap", opacity: 0.9 }}>
        {blog.content}
      </pre>
    </motion.div>
  );
}
