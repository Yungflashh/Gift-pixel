import React from "react";

const PromiseCardSection = () => {
  return (
    <div style={styles.section}>
      {/* First Container */}
      <div style={styles.containerFirst}>
        <div style={styles.textWrapperLeft}>
          <h2 style={styles.headerLeft}>Track Your Promise Card Activities</h2>
          <p style={styles.paragraphLeft}>
            View detailed statistics and track items purchased on each Promise Card with ease.
          </p>
        </div>
        <div style={styles.chartWrapper}>
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736677293/Frame_388_khc8d6.png"
            alt="Chart displaying activities"
            style={styles.chartImage}
          />
        </div>
      </div>

      {/* Second Container */}
      <div style={styles.containerSecond}>
        <div style={styles.textWrapperRight}>
          <h2 style={styles.headerRight}>
            Create, Share, and Connect with a Promise Card
          </h2>
          <p style={styles.paragraphRight}>
            Bring your connections to life with a personalized Promise Card. Create a card, share it with your loved ones, and strengthen your bond in a meaningful way. It's the perfect way to connect and spread love.
          </p>
        </div>
        <div style={styles.mapWrapper}>
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736677397/Earth_tx64du.png"
            alt="Map with connections"
            style={styles.mapImage}
          />
          {/* Avatars */}
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598510/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_teb7bd.png"
            alt="Avatar 1"
            style={{ ...styles.avatar, top: "30%", left: "25%" }}
          />
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598509/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_1_eecgr3.png"
            alt="Avatar 2"
            style={{ ...styles.avatar, top: "50%", left: "60%" }}
          />
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598501/R_3_1_fmctna.png"
            alt="Avatar 3"
            style={{ ...styles.avatar, top: "70%", left: "40%" }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  section: {
    marginTop: "-60px",
    display: "flex",
    gap: "40px",
    padding: "80px",
    justifyContent: "space-between",
  },
  containerFirst: {
    flex: 1,
    backgroundImage: `url("https://res.cloudinary.com/dqbbm0guw/image/upload/v1736675747/Grid_rcitvb.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px",
    padding: "30px",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  textWrapperLeft: {
    position: "absolute",
    top: "20px",
    right: "30px",
    textAlign: "right",
  },
  headerLeft: {
    fontSize: "24px",
    color: "#FF6F61",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  paragraphLeft: {
    fontSize: "16px",
    color: "#6B7280",
  },
  chartWrapper: {
    position: "absolute",
    bottom: "20px",
    left: "30px",
  },
  chartImage: {
    width: "100%",
    height: "auto",
    marginBottom: "60px",
  },
  containerSecond: {
    flex: 1,
    background: "rgba(216, 232, 231, 1)",
    borderRadius: "20px",
    padding: "30px",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  textWrapperRight: {
    marginBottom: "20px",
  },
  headerRight: {
    fontSize: "24px",
    color: "#333333",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  paragraphRight: {
    fontSize: "16px",
    color: "#6B7280",
  },
  mapWrapper: {
    position: "relative",
    marginTop: "20px",
  },
  mapImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
  avatar: {
    position: "absolute",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #FFFFFF",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
  },
};

export default PromiseCardSection;
