import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaMoneyBillWave, FaGift } from 'react-icons/fa'; // Import the money and gift icons
import '../styles/ReceiverView.css';

const ReceiverView = () => {
    const { promiseTitleId } = useParams();
    const [ReceiverView, setReceiverView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    // Fetch user email from the backend
    const fetchEmail = async () => {
        try {
            const token = Cookies.get('token'); 
            if (!token) {
                alert('You are not a registered user. Please sign up to make a payment.');
                navigate('/signup');
                return;
            }

            const response = await axios.get('https://auth-zxvu.onrender.com/api/auth/get-user-email', {
                headers: { 'Authorization': `Bearer ${token}` },
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
            alert('Error fetching email');
        }
    };

    // Fetch promise details based on the ID in the URL
    useEffect(() => {
        const fetchReceiverView = async () => {
            try {
                const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/get-promise-details/${promiseTitleId}`);
                const username = response.data.username;
                Cookies.set("username", username);

                if (response.data.success) {
                    setReceiverView(response.data.promise);
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

    // Handle paying for a request
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
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
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

    // Handle redirecting to the gift URL
    const handleBuyNowRedirect = (requestValue) => {
        window.location.href = requestValue;
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="promise-details-container">
            <h2>{ReceiverView.title}</h2>
            <p>{ReceiverView.description}</p>

            <h3>Requests:</h3>
            {ReceiverView.requests.length > 0 ? (
                <ul>
                    {ReceiverView.requests.map((request, index) => (
                        <li key={index}>
                            <strong>{request.requestType}: </strong> <span className='request-value'>{request.requestValue}</span>
                            <div className="payment-status">
                                {request.paid === true ? (
                                    <span className="paid-status">Paid</span>
                                ) : (
                                    <span className="not-paid-status">Not Paid</span>
                                )}
                            </div>

                            {/* Display money icon for "money" requestType, and gift icon otherwise */}
                            <div className="icon">
                                {request.requestType === 'money' ? (
                                    <FaMoneyBillWave size={20} color="green" />
                                ) : (
                                    <FaGift size={20} color="purple" />
                                )}
                            </div>

                            {/* Show "Buy Now" for gift requests, "Pay Now" for others */}
                            {!request.paid && (
                                request.requestType === 'gift-item' ? (
                                    <button
                                        className="buy-button"
                                        onClick={() => handleBuyNowRedirect(request.requestValue)}
                                    >
                                        Buy Now
                                    </button>
                                ) : (
                                    <button
                                        className="pay-button"
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
                <p>No requests available for this promise.</p>
            )}
        </div>
    );
};

export default ReceiverView;
