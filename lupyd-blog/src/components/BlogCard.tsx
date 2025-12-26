import type { Blog } from "../data/blogs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={blog.image} alt={blog.title} className="blog-img" />
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <Link className="read" to={`/blogs/${blog.id}`}>
        Read More →
      </Link>
    </motion.div>
  );
}
