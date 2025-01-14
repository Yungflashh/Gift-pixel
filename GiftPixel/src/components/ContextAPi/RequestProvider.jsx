import React, { createContext, useContext, useState } from 'react';
import PaymentSuccessPage from '../../pages/PaymentSuccessPage/PaymentSuccessPage';
import ReceiverView from '../ReceiverView';

// Create Context
const RequestContext = createContext();

// Create a custom hook to use the context
export const useRequest = () => {
    return useContext(RequestContext);
};

// Context provider component
export const RequestProvider = ({ children }) => {
    const [requestId, setRequestId] = useState(null);

    // Function to update requestId
    const updateRequestId = (id) => {
        setRequestId(id);
    };

    return (
        <RequestContext.Provider value={{ requestId, updateRequestId }}>
            {<PaymentSuccessPage/>}
            {ReceiverView}
        </RequestContext.Provider>
    );
};
