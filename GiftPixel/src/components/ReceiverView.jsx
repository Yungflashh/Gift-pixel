import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ReceiverView.css';

const ReceiverView = () => {
    const { promiseTitleId } = useParams();
    const [ReceiverView, setReceiverView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [shareToken, setShareToken] = useState(null);
    const [modalState, setModalState] = useState({ isOpen: false, requestId: null, amount: null });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReceiverView = async () => {
            try {
                const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/get-promise-details/${promiseTitleId}`);
                const username = response.data.username;
                Cookies.set("username", username);

                if (response.data.success) {
                    setReceiverView(response.data.promise);
                    if (response.data.promise.shareToken) {
                        setShareToken(response.data.promise.shareToken);
                    }
                } else {
                    setError('Promise not found');
                }
            } catch (err) {
                setError('Error fetching promise details');
            } finally {
                setLoading(false);
            }
        };

        fetchReceiverView();
    }, [promiseTitleId]);

    useEffect(() => {
        if (shareToken) {
            trackShareLink();
        }
    }, [shareToken]);

    const trackShareLink = async () => {
        if (shareToken) {
            try {
                Cookies.set("promiseId", promiseTitleId);
                const response = await axios.post(`https://auth-zxvu.onrender.com/api/auth/track/${promiseTitleId}/${shareToken}`);
                if (response.data.success) {
                    console.log('Link access tracked successfully');
                } else {
                    console.log('Failed to track link access');
                }
            } catch (error) {
                console.error('Error tracking share link access:', error);
            }
        }
    };

    const handlePayRequest = async (requestId, amount) => {
        if (!amount || !email) {
            toast.error('Please provide all required fields.');
            return;
        }

        try {
            Cookies.set('requestId', requestId, { expires: 7 });
            const response = await axios.post('https://auth-zxvu.onrender.com/api/auth/paystack/payment', { orderId: requestId, amount, email });

            if (response.data.success) {
                const authorizationUrl = response.data.authorization_url;
                if (authorizationUrl) {
                    navigate('/payment-success', { state: { requestId } });
                    window.location.href = authorizationUrl;
                } else {
                    setError('Failed to get Paystack authorization URL');
                }
            } else {
                setError('Failed to initialize payment');
            }
        } catch (err) {
            setError('Error processing payment');
        }
    };

    const handleSubmitEmail = (requestId, amount) => {
        if (!email) {
            toast.error('Please enter a valid email');
            return;
        }
        setModalState({ isOpen: false, requestId: null, amount: null });
        handlePayRequest(requestId, amount);
    };

    // Handle redirection for the "Buy Now" button
    const handleBuyNowRedirect = (value) => {
        navigate(value); // Assuming the value is a valid URL
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        toast.error(error);
        return <div className="error-message-box">{error}</div>;
    }

    return (
        <div className="promise-detail-wrapper">
            <h2 className="promise-title">{ReceiverView.title}</h2>
            <h3 className="request-header">Requests:</h3>
            {ReceiverView.requests.length > 0 ? (
                <ul className="request-list">
                    {ReceiverView.requests.map((request, index) => (
                        <li key={index} className="request-item">
                            <div className="request-info">
                                <strong className="request-type">{request.requestType}:</strong>
                                <span className="request-value">{request.requestValue}</span>
                            </div>
                            <div className="payment-status-container">
                                {request.paid ? (
                                    <span className="payment-status-paid">Paid</span>
                                ) : (
                                    <span className="payment-status-unpaid">Not Paid</span>
                                )}
                            </div>

                            {/* Conditional rendering of Buy Now button for gift item type */}
                            {!request.paid && request.requestType === 'gift-item' && (
                                <button
                                    className="buy-now-btn"
                                    onClick={() => handleBuyNowRedirect(request.requestValue)} // Redirect to the gift item's value (URL)
                                >
                                    Buy Now
                                </button>
                            )}

                            {/* Pay Now button logic if request type is not a gift-item */}
                            {!request.paid && request.requestType !== 'gift-item' && (
                                <button
                                    className="pay-now-btn"
                                    onClick={() => setModalState({ isOpen: true, requestId: request._id, amount: request.requestValue })}
                                >
                                    Pay Now
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-requests-message">No requests available for this promise.</p>
            )}

            {/* Modal for email input */}
            {modalState.isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Enter Your Email</h3>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required
                        />
                        <button onClick={() => handleSubmitEmail(modalState.requestId, modalState.amount)}>Submit</button>
                        <button onClick={() => setModalState({ isOpen: false, requestId: null, amount: null })}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceiverView;
