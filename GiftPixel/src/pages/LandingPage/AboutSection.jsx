const AboutSection = () => {
    const styles = {
      section: {
        backgroundColor: "rgba(242, 223, 216, 1)", // Light pink background
        padding: "4rem 2rem",
      },
      container: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
      },
      containerResponsive: {
        gridTemplateColumns: "1fr 1fr",
      },
      imageContainer: {
        display: "flex",
        alignItems: "flex-end", // Align images to the bottom
        position: "relative",
        gap: "0px", // No gap between images
        marginLeft: "-8rem", // Move images further left
      },
      image: {
        width: "40%", // Increase image size to 40% to make them bigger
        objectFit: "contain",
        marginBottom: "-60px", // Fine-tune this value if needed
        marginRight: "-60px", //
      },
      leftImage: {
        // No extra styles needed
      },
      centerImage: {
        // No extra styles needed
      },
      rightImage: {
        // No extra styles needed
      },
      textContainer: {
        paddingLeft: "1rem",
      },
      titleContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
      },
      dot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#b91c1c", // Deep red
        marginRight: "0.5rem",
      },
      title: {
        fontSize: "2rem",
        color: "#b91c1c", // Deep red
        margin: 0,
      },
      text: {
        fontSize: "1rem",
        color: "#4b5563", // Neutral gray
        lineHeight: "1.8",
        marginBottom: "1rem",
      },
    };
  
    return (
      <section style={styles.section}>
        <div
          style={{
            ...styles.container,
            ...(window.innerWidth >= 768 ? styles.containerResponsive : {}),
          }}
        >
          {/* Image Container */}
          <div style={styles.imageContainer}>
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736685645/Nothing_Phone_1_2_h2ftkq.png"
              alt="Mobile App Screenshot 1"
              style={{ ...styles.image, ...styles.leftImage }}
            />
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736685645/Nothing_Phone_1_nybplx.png"
              alt="Mobile App Screenshot 2"
              style={{ ...styles.image, ...styles.centerImage }}
            />
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736685645/Nothing_Phone_1_1_ikr0qt.png"
              alt="Mobile App Screenshot 3"
              style={{ ...styles.image, ...styles.rightImage }}
            />
          </div>
  
          {/* Text Container */}
          <div style={styles.textContainer}>
            <div style={styles.titleContainer}>
              <span style={styles.dot}></span>
              <h2 style={styles.title}>About Us</h2>
            </div>
            <p style={styles.text}>
              Welcome to GiftPixel, your go-to platform for creating personalized
              Promise Cards that bring joy and connection to every occasion. At
              GiftPixel, we believe in the power of thoughtful gestures and
              meaningful interactions. Our platform allows you to create and
              share unique Promise Cards with your loved ones, strengthening
              bonds and spreading happiness.
            </p>
            <p style={styles.text}>
              With GiftPixel, you can create personalized Promise Cards by adding
              any type of gift items or money to your promise list, making each
              interaction thoughtful and unique. Any money fulfilled as part of a
              promise is securely deposited into the GiftPixel wallet, where you
              can easily withdraw it to your preferred account through a trusted
              and secure payment gateway.
            </p>
            <p style={styles.text}>
              Whether you're celebrating a special milestone, sharing a heartfelt
              promise, or planning a memorable event, GiftPixel provides the
              tools you need to make every moment extraordinary. Join our
              community today and discover a new way to create, share, and
              connect with the ones you care about the most.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  