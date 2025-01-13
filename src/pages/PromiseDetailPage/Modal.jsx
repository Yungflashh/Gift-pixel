import { FaCopy } from "react-icons/fa";
import { BiLogoFacebook } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
// import "../../styles/Modal.css"; // Add your CSS styling

const Modal = ({ shareLink, onClose, isUsernameVisible, toggleUsernameVisibility }) => {

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        alert('Link copied to clipboard!');
    };

    const handleShare = (platform) => {
        const url = encodeURIComponent(shareLink);
        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=Check this out&body=${url}`;
                break;
            default:
                break;
        }
        window.open(shareUrl, '_blank');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Share Promise</h3>
                    <button onClick={onClose} className="close-button">X</button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="share-link-input"
                    />
                    <button onClick={handleCopyLink} className="copy-link-button"><FaCopy color='black' /></button>
                    
                    {/* Username visibility toggle */}
                    <div className="username-toggle">
                        <label htmlFor="usernameVisibility">Show my username</label>
                        <input 
                            type="checkbox" 
                            id="usernameVisibility" 
                            checked={isUsernameVisible}
                            onChange={toggleUsernameVisibility} 
                        />
                    </div>

                    <div className="social-buttons">
                        <button onClick={() => handleShare('facebook')} className="social-button"><BiLogoFacebook color='blue' size={25}/></button>
                        <button onClick={() => handleShare('twitter')} className="social-button"><FaXTwitter color='black' size={25}/></button>
                        <button onClick={() => handleShare('linkedin')} className="social-button"><FaLinkedin color='blue' size={25}/></button>
                        <button onClick={() => handleShare('whatsapp')} className="social-button"><FaWhatsapp color='green' size={25}/></button>
                        <button onClick={() => handleShare('email')} className="social-button"><MdOutlineMailOutline color='brown' size={25}/> </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
