import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Contact LUPYD</h1>
      <p style={{ maxWidth: "600px", opacity: 0.8 }}>
        Have questions, feedback, or partnership ideas?  
        Reach out to us — we’d love to connect.
      </p>

      <div
        className="card"
        style={{
          marginTop: "2rem",
          maxWidth: "600px",
        }}
      >
        <form>
          <label>Name</label>
          <input type="text" placeholder="Your name" required />

          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />

          <label>Message</label>
          <textarea
            rows={4}
            placeholder="Tell us how we can help you"
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>

      <div style={{ marginTop: "2rem", opacity: 0.8 }}>
        <p>📧 support@lupyd.com</p>
        <p>🤝 For Paid & Collaborations</p>
      </div>
    </motion.div>
  );
}
