import React from "react";
import { AiOutlineGift, AiOutlineHeart, AiOutlineFileDone } from "react-icons/ai";

const StepsSection = () => {
  const steps = [
    {
      id: 1,
      icon: <AiOutlineFileDone size={40} style={{ color: "#FF6E6E" }} />,
      title: "Create your promise card",
      description:
        "Design a personalized promise card to share your commitments and inspire others.",
    },
    {
      id: 2,
      icon: <AiOutlineGift size={40} style={{ color: "#4CAF50" }} />,
      title: "Add to list",
      description:
        "Add your preferred gifts to the list, creating a heartfelt collection of meaningful promises.",
    },
    {
      id: 3,
      icon: <AiOutlineHeart size={40} style={{ color: "#FF6E6E" }} />,
      title: "Share your promise card",
      description:
        "Design a personalized promise card to share your commitments and inspire others.",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Easy steps to use our service</h2>
      <div style={styles.stepsContainer}>
        {steps.map((step) => (
          <div key={step.id} style={styles.card}>
            <div style={styles.iconContainer}>{step.icon}</div>
            <h3 style={styles.cardTitle}>{step.title}</h3>
            <p style={styles.cardDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "50px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#333",
  },
  stepsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "80px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "300px",
    textAlign: "left",
  },
  iconContainer: {
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    margin: "10px 0",
    color: "#333",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.5",
  },
};

export default StepsSection;
