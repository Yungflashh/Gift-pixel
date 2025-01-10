import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the necessary CSS for Toastify
import '../styles/ReceiverView.css';

const ReceiverView = () => {
    const { promiseTitleId } = useParams();
    const [ReceiverView, setReceiverView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [shareToken, setShareToken] = useState(null); // New state to hold the share token
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const navigate = useNavigate();

    // Fetch user email for payment process
    const fetchEmail = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                toast.error('You are not a registered user. Please sign up to make a payment.'); // Use toast for error
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
                toast.error('Unable to fetch user email. Please log in again.'); // Use toast for error
                navigate('/login');
            }
        } catch (error) {
            toast.error('Error fetching email'); // Use toast for error
        }
    };

    // Fetch promise details and track the link access using shareToken
    useEffect(() => {
        const fetchReceiverView = async () => {
            try {
                const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/get-promise-details/${promiseTitleId}`);
                const username = response.data.username;
                Cookies.set("username", username);
                // console.log(response);
                

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
                    console.log(shareToken, "linee");
                    
                    Cookies.set("promiseId", promiseTitleId);

                    const response = await axios.post(`https://auth-zxvu.onrender.com/api/auth/track/${promiseTitleId}/${shareToken}`);

                    console.log(response.data);
                    
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
        // fetchEmail();
        // const token = Cookies.get('token');
        // if (!token) {
        //     toast.error('You are not a registered user. Please sign up to make a payment.'); // Use toast for error
        //     navigate('/signup');
        //     return;
        // }

        const amount = ReceiverView.requests.requestValue

        console.log(amount);
        

        if (!amount) {
            setError('Amount is missing');
            return;
        }

        if (!email) {
            toast.error('Unable to fetch your email. Please try again.'); // Use toast for error
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

    // Handle modal submit
    const handleSubmitEmail = () => {
        if (!email) {
            toast.error('Please enter a valid email');
            return;
        }
        setIsModalOpen(false);
        handlePayRequest(); // Call payment logic after email submission
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        toast.error(error); // Display error message via toast
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
                                        onClick={() => setIsModalOpen(true)} // Open modal to input email
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

            {/* Modal for email input */}
            {isModalOpen && (
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
                        <button onClick={handleSubmitEmail}>Submit</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceiverView;
