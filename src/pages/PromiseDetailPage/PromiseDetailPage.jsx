import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar"; // Import Sidebar
import axios from "axios";
import Cookies from "js-cookie";
import { BiLogoFacebook } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import "../../styles/ListOfRequest.css"; // Import your CSS for styling
import { PiShareThin } from "react-icons/pi";
import { Rings } from "react-loader-spinner"; // Importing ClipLoader spinner
import { FaDollarSign, FaGift } from 'react-icons/fa';


// Modal for sharing the promise
const Modal = ({ shareLink, onClose }) => {
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
                    <h3>Share Promise List</h3>
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
                    <div className="social-buttons">
                        <button onClick={() => handleShare('facebook')} className="social-button"> <BiLogoFacebook color='blue' size={25}/></button>
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

// This is the request display component
const CreatorView = ({ promiseTitleId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setError('User is not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await axios.post(
                    'https://auth-zxvu.onrender.com/api/auth/get-promise-requests',
                    { promiseTitleId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (Array.isArray(response.data)) {
                    setRequests(response.data);
                } else {
                    setError('Invalid data format');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching request for this promise');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [promiseTitleId]);

    if (loading) {
        return (
            <div className="loading">
                <Rings size={300} color={"#FF5050"} loading={loading} />
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="requests-container">
            {requests.length > 0 ? (
                <ul className="requests-list">
                    {requests.map((request, index) => (
                        <li key={index}>
                            <strong>
                                {request.requestType === 'money' ? (
                                    <>
                                        <FaDollarSign color="green"/> {request.requestType}:
                                    </>
                                ) : request.requestType === 'gift-item' ? (
                                    <>
                                        <FaGift color="#ff5050"/> {request.requestType}:
                                    </>
                                ) : (
                                    <>{request.requestType}:</>
                                )}
                            </strong>  <span className="reqValue">{request.requestValue}</span> 
                            <div className="payment-status">
                                {request.paid ? (
                                    <span className="paid-status">Paid</span>
                                ) : (
                                    <span className="not-paid-status">Not Paid</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-requests-message">No requests available for this promise title.</p>
            )}
        </div>
    );
};

const PromiseDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { promise } = location.state || {};
    const promiseId = promise?._id;

    if (!promise) {
        navigate("/"); 
        return null;
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [sharing, setSharing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAddToList = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = Cookies.get('token');
        if (!token) {
            console.error("User is not authenticated");
            return;
        }

        const requestData = {
            promiseId: promise._id,
            type: promise.type,
            input: input,
        };

        try {
            await axios.post(
                "https://auth-zxvu.onrender.com/api/auth/user/submit-request",
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLoading(false);
            setIsSidebarOpen(false);
        } catch (error) {
            setLoading(false);
            console.error("Error submitting request:", error);
        }
    };

    const handleShare = async () => {
        setSharing(true);
        setShareLink('');
        const token = Cookies.get('token');
        if (!token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const response = await axios.post(
                `https://auth-zxvu.onrender.com/api/auth/sharePromise/${promiseId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.shareLink) {
                setShareLink(response.data.shareLink);
                setShowModal(true);
            } else {
                console.error('Error generating share link');
            }
        } catch (err) {
            console.error('Error generating share link', err);
        } finally {
            setSharing(false);
        }
    };

    return (
        <div className="promise-detail-page">
            <div className="main-promise-header">
                <div className="promise-header">
                    <h2>{promise.title}</h2>
                    <p>{promise.description}</p>
                </div>
                <button onClick={handleShare} disabled={sharing} className="share-button">
                    {sharing ? 'Generating Link...' : <>Share Promise <PiShareThin size={20} /></>}
                </button>
            </div>

            <CreatorView promiseTitleId={promiseId} />

            {showModal && <Modal shareLink={shareLink} onClose={() => setShowModal(false)} />}

            <button className="add2list-btn" onClick={handleAddToList}>Add to List</button>

            {isSidebarOpen && (
                <Sidebar onClose={() => setIsSidebarOpen(false)} promiseId={promiseId}>
                </Sidebar>
            )}
        </div>
    );
};

export default PromiseDetailPage;
