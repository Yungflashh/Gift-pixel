import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/ReceiverView.css';

const ReceiverView = () => {
    const { promiseTitleId } = useParams();
    const [ReceiverView, setReceiverView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const [shareToken, setShareToken] = useState(null); // New state to hold the share token
    const navigate = useNavigate();

    // Fetch user email for payment process
    const fetchEmail = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                alert('You are not a registered user. Please sign up to make a payment.');
                navigate('/signup');
                return;
            }

            const response = await axios.get('https://auth-zxvu.onrender.com/api/auth/get-user-email', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.data.success) {
                setEmail(response.data.email);
            } else {
                alert('Unable to fetch user email. Please log in again.');
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            // alert('Error fetching email');
        }
    };

    // Fetch promise details and track the link access using shareToken
    useEffect(() => {
        const fetchReceiverView = async () => {
            try {
                const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/get-promise-details/${promiseTitleId}`);
                const username = response.data.username;
                Cookies.set("username", username);

                if (response.data.success) {
                    setReceiverView(response.data.promise);
                    console.log(response.data);
                    
                    trackShareLink()
                    
                    if (response.data.promise.shareToken) {
                        console.log(response.data.promise.shareToken);
                        
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
            console.log(shareToken);
            
        // Track the access when the promise details are fetched
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
        
        // Fetch the promise data and track the access
        fetchReceiverView();
        trackShareLink(); // Track the link when the page is loaded
    }, [promiseTitleId, shareToken]); // Adding `shareToken` dependency to ensure it's available when tracking

    // Handle the payment request
    const handlePayRequest = async (requestId) => {
        fetchEmail();
        const token = Cookies.get('token');
        if (!token) {
            alert('You are not a registered user. Please sign up to make a payment.');
            navigate('/signup');
            return;
        }

        const amount = ReceiverView.requests.find((req) => req._id === requestId)?.requestValue;

        if (!amount) {
            setError('Amount is missing');
            return;
        }

        if (!email) {
            alert('Unable to fetch your email. Please try again.');
            return;
        }

        try {
            Cookies.set('requestId', requestId, { expires: 7 });

            const response = await axios.post(
                'https://auth-zxvu.onrender.com/api/auth/paystack/payment',
                { orderId: requestId, amount, email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

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

    // Handle "Buy Now" redirect for gift items
    const handleBuyNowRedirect = (requestValue) => {
        window.location.href = requestValue;
    };

   

   
    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message-box">{error}</div>;
    }

    return (
        <div className="promise-detail-wrapper">
            <h2 className="promise-title">{ReceiverView.title}</h2>
            <p className="promise-description">{ReceiverView.description}</p>

            <h3 className="request-header">Requests:</h3>
            {ReceiverView.requests.length > 0 ? (
                <ul className="request-list">
                    {ReceiverView.requests.map((request, index) => (
                        <li key={index} className="request-item">
                            <strong className="request-type">{request.requestType}:</strong>
                            <span className="request-value">{request.requestValue}</span>
                            <div className="payment-status-container">
                                {request.paid ? (
                                    <span className="payment-status-paid">Paid</span>
                                ) : (
                                    <span className="payment-status-unpaid">Not Paid</span>
                                )}
                            </div>

                            {!request.paid && (
                                request.requestType === 'gift-item' ? (
                                    <button
                                        className="buy-now-btn"
                                        onClick={() => handleBuyNowRedirect(request.requestValue)}
                                    >
                                        Buy Now
                                    </button>
                                ) : (
                                    <button
                                        className="pay-now-btn"
                                        onClick={() => handlePayRequest(request._id)}
                                    >
                                        Pay Now
                                    </button>
                                )
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-requests-message">No requests available for this promise.</p>
            )}
        </div>
    );
};

export default ReceiverView;
