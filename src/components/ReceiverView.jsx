import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/ReceiverView.css';

const ReceiverView = () => {
    const { promiseTitleId } = useParams();
    const [ReceiverView, setReceiverView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null); // State to store email
    const navigate = useNavigate();
    // const location = useLocation();

    // Fetch user email from the backend
    const fetchEmail = async () => {
        try {
            const token = Cookies.get('token'); 
            console.log(token);
            

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
                setEmail(response.data.email); // Set the email in state
            } else {
                alert('Unable to fetch user email. Please log in again.');
                navigate('/login'); // Redirect to login if email is not found
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

    // Fetch email when the component mounts

    // Handle paying for a request
    const handlePayRequest = async (requestId) => {
        fetchEmail()
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
            console.log(requestId);
            
          
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
                // After initializing the payment, redirect to Paystack's payment page
                const authorizationUrl = response.data.authorization_url; // URL to redirect to Paystack
    
                if (authorizationUrl) {
                    navigate('/payment-success', { state: { requestId } });  // Pass requestId via state
                    window.location.href = authorizationUrl;  // Redirect user to Paystack
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
        window.location.href = requestValue; // Redirect to the gift URL (if applicable)
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
                            <strong>{request.requestType}: </strong>{request.requestValue}
                            <div className="payment-status">
                                {request.paid === true ? (
                                    <span className="paid-status">Paid</span>
                                ) : (
                                    <span className="not-paid-status">Not Paid</span>
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
