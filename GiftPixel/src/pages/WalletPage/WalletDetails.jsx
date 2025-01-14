import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../../styles/WalletDetails.css"

const WalletDetails = () => {
    const [walletData, setWalletData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch wallet data using Axios
    const fetchWalletDetails = async () => {
        const token = Cookies.get('token'); // Get token from local storage

        if (!token) {
            setError('Authorization token is missing.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('https://auth-zxvu.onrender.com/api/auth/getWalletDetails', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass token in Authorization header
                },
            });
                console.log(response.data);
                
            // Check for success and set wallet data
            if (response.data.success) {
                setWalletData(response.data.wallet); // Set wallet data from API response
            } else {
                setError('Failed to fetch wallet details');
            }
        } catch (err) {
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

    // Function to handle the withdraw button click (placeholder)
    const handleWithdraw = () => {
        console.log("Withdraw button clicked!");
        // You can implement your withdrawal functionality here
    };

    return (
        <div className='wallet-body'>
            <div className="wallet-container">
                <h1>Wallet Details</h1>
                <div className="wallet-details">
                    <p><strong>Balance:</strong> {walletData.balance}</p>
                </div>

    
                <button onClick={handleWithdraw} className="withdraw-button">
                    Withdraw
                </button>

                <h2>Transaction History</h2>
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {walletData.transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.Transaction_ID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WalletDetails;
