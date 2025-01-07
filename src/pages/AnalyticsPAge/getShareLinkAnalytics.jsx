import axios from "axios"
// import Cookies from "js-cookie"

const GetShareLinkAnalytics = async () => {
    
    const promiseTitleId = "677d3984c4c379593aa69565";
        try {
            const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/analytics/${promiseTitleId}`);
            if (response.data.success) {
                console.log(response.data);
                
                console.log('Share link analytics:', response.data.analytics);
            } else {
                console.log('Failed to retrieve analytics');
            }
        } catch (error) {
            console.error('Error retrieving share link analytics:', error);
        }
    };


    export default GetShareLinkAnalytics