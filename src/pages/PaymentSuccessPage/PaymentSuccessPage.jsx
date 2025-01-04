import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "../../styles/PaymentSuccessPage.css";
import Cookies from "js-cookie";

const PaymentSuccessPage = () => {
    const requestId = Cookies.get('requestId');
    const token = Cookies.get('token'); 
    console.log(requestId);

    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get('reference');
    const trxref = queryParams.get('trxref');

    useEffect(() => {
        if (reference && trxref) {
            verifyPayment(reference, trxref);
        }
    }, [reference, trxref]);

    const verifyPayment = async (reference, trxref) => {
        try {
            console.log(requestId);

            // Add token to the headers
            const response = await axios.post(
                'https://auth-zxvu.onrender.com/api/auth/payment/verify',
                {
                    reference: reference,
                    trxref: trxref,
                    requestId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Sending the token in the header
                    }
                }
            );
            console.log(reference);

            if (response.data.success) {
                setPaymentStatus('Payment successful! Your request has been processed.');
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
        <div>
            <h1>Payment Status</h1>
            <p>{paymentStatus}</p>
        </div>
    );
};

export default PaymentSuccessPage;
