import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/PaymentSuccessPage.css";
import Cookies from "js-cookie";

const PaymentSuccessPage = () => {
    const requestId = Cookies.get('requestId');
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    const location = useLocation();
    const navigate = useNavigate(); // Added for navigation

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(10); // Countdown state

    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get('reference');
    const trxref = queryParams.get('trxref');

    useEffect(() => {
        if (reference && trxref) {
            verifyPayment(reference, trxref);
        }

        // Countdown logic
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    navigate("/signin"); // Redirect to sign-in after countdown finishes
                }
                return prev - 1;
            });
        }, 1000); // Update countdown every second

        return () => clearInterval(timer); // Clean up interval on component unmount
    }, [reference, trxref, navigate]);

    const verifyPayment = async (reference, trxref) => {
        try {
            const response = await axios.post(
                'https://auth-zxvu.onrender.com/api/auth/payment/verify',
                {
                    reference: reference,
                    trxref: trxref,
                    requestId,
                    username
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setPaymentStatus('Payment has already been made. Your request has been processed.');
            } else {
                setPaymentStatus('Payment verification failed.');
            }
        } catch (error) {
            setPaymentStatus('Error verifying payment.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payment-success-container">
            <div className="payment-status">
                <h1>Payment Made</h1>
                <p>{paymentStatus}</p>
                <p>Redirecting to the sign-in page in {countdown} seconds...</p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
