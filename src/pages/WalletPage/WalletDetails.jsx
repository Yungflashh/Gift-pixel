import  { useEffect, useState } from 'react';

import axios from "axios"
import Cookies from "js-cookie"

import "../../styles/WalletDetails.css"

const WalletDetails = () => {
    const [walletData, setWalletData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch wallet data
    const fetchWalletDetails = async () => {
        const token = Cookies.get('token'); // Get token from local storage

        if (!token) {
            setError('Authorization token is missing.');
            setLoading(false);
            return;
        }

        try {
            const response = axios.get('https://auth-zxvu.onrender.com/api/auth/getWalletDetails', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass token in Authorization header
                },
            });

            const data = await response.json();

            if (data.success) {
                setWalletData(data.wallet); // Set wallet data if response is successful
            } else {
                setError('Failed to fetch wallet details');
            }
        } catch (err) {
            console.log(err);
            
            setError('Error fetching wallet details');
        } finally {
            setLoading(false); // Stop loading after the request is done
        }
    };

    // Run the fetchWalletDetails function when the component mounts
    useEffect(() => {
        fetchWalletDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="wallet-container">
            <h1>Wallet Details</h1>
            <div className="wallet-details">
                <p><strong>Balance:</strong> {walletData.balance}</p>
            </div>

            <h2>Transaction History</h2>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {walletData.transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WalletDetails;
