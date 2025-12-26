import { motion } from "framer-motion";
import BlogList from "./BlogList";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container">
        <h1>Welcome to LUPYD</h1>
        <p>
          Secure. Scalable. Growth-focused social platform.
        </p>
      </div>

      {/* 👇 SHOW BLOGS ON HOME */}
      <BlogList />
    </motion.div>
  );
}
