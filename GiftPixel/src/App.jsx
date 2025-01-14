import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import AboutPage from "./pages/AboutPage/AboutPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage/EmailVerificationPage";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import PromiseCard from "./pages/PromiseCard/PromiseCard";
import PropsCard from "./components/PropsCard";
import PromiseListPage from "./pages/PromiseListPage/PromiseListPage";
import CurrentUserpage from "./pages/CurrentUserPage/CurrentUserpage";
import PromiseDetailPage from "./pages/PromiseDetailPage/PromiseDetailPage";
// import PromiseRequests from "./components/ListOfRequest"
import { ToastContainer } from 'react-toastify';
import ReceiverView from "./components/ReceiverView";
import Header from "./static/Header";
import PaymentSuccess from "./pages/PaymentSuccessPage/PaymentSuccessPage";
import NotFound from "./components/NotFound";
import WalletDetails from "./pages/WalletPage/WalletDetails";
import getShareLinkAnalytics from "./pages/AnalyticsPAge/getShareLinkAnalytics";
import GetShareLinkAnalytics from "./pages/AnalyticsPAge/getShareLinkAnalytics";
import Reset from "./pages/ForgetPassword/Reset";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AccountSettingPage from "../src/pages/AccountSettingPage/AccountSettingPage"

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />

      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Check the current route to conditionally render the header
  const shouldShowHeader = [
    "/promiseList",
    "/createPromise",
    "/walletBalance",
    "/profileSettings"
  ].includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />} {/* Conditionally render header */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/forgotPassword" element={<ForgetPassword />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route
          path="/emailVerificationPage"
          element={<EmailVerificationPage />}
        />
        <Route path="/dashboard" />
        <Route path="/createPromise" element={<PromiseCard />} />
        <Route path="/template" element={<PropsCard />} />
        <Route path="/promiseList" element={<PromiseListPage />} />
        <Route path="/currentuserpage" element={<CurrentUserpage />} />

        <Route path="/promise/:id" element={<PromiseDetailPage />} />

        <Route
          path="/promise-gift/:promiseTitleId/:shareToken"
          element={<ReceiverView />}
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/walletBalance" element={<WalletDetails />} />
        <Route
          path="/analytics"
          element={<GetShareLinkAnalytics />}
        />
        <Route path="/reset-password/:resetToken" element={<Reset />} />
        <Route path="profileSettings" element={<ProfilePage />} />
        <Route path="accountsettingpage" element={<AccountSettingPage/>}/>
      </Routes>
    </>
  );
};

export default App;
