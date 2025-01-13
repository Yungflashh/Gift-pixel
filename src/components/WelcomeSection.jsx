import "../styles/WelcomeSection.css"
import GiftPixelLogo from "../assets/GiftPixel.svg"
const WelcomeSection = () => {
  return (
    <div className="welcome-container"> 
         <div className="welcome-flower-container">
            <div className="welcome-writeup">
                <img className="logo-gift" src={GiftPixelLogo} alt="GiftPixel Logo" />
                <h1>Welcome to GiftPixel</h1>
                <p>Share Meaningful Promises With Your Loved Ones</p>
                </div>
        
                <img
                className="flower"
                src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1733307863/image_gnnaf1.png"
                alt="Decorative SVG"
              />
              </div>
    </div>
  )
}

export default WelcomeSection