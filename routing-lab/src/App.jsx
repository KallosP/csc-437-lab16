import {Homepage} from "./Homepage";
import {AccountSettings} from "./AccountSettings";
import {ImageGallery} from "./images/ImageGallery.jsx";
import {ImageDetails} from "./images/ImageDetails.jsx";
import {MainLayout} from "./MainLayout.jsx";
import {BrowserRouter, Routes, Route} from "react-router";
import {Header} from "./Header";
import {useEffect, useState} from "react";
import {useImageFetching} from "./images/useImageFetching.js";
import RegisterPage from "./auth/RegisterPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import {ProtectedRoute} from "./auth/ProtectedRoute.jsx";

function App() {
	const [accountName, setAccountName] = useState("");
	const [authToken, setAuthToken] = useState("");

	const {isLoading, fetchedImages} = useImageFetching("", authToken);

	const handleAccountNameChange = (event) => {
		setAccountName(event.target.value);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route
						index
						element={
							<ProtectedRoute authToken={authToken}>
								<Homepage userName={accountName} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/account"
						element={
							<ProtectedRoute authToken={authToken}>
								<AccountSettings setUserName={handleAccountNameChange} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/images"
						element={
							<ProtectedRoute authToken={authToken}>
								<ImageGallery authToken={authToken} isLoading={isLoading} fetchedImages={fetchedImages} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/images/:imageId"
						element={
							<ProtectedRoute authToken={authToken}>
								<ImageDetails authToken={authToken} />
							</ProtectedRoute>
						}
					/>
					<Route path="/register" element={<RegisterPage setAuthToken={setAuthToken} />} />
					<Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
	//    const POSSIBLE_PAGES = [
	//        <Homepage userName="John Doe" />,
	//        <AccountSettings />,
	//        <ImageGallery />,
	//        <ImageDetails imageId="0" />
	//    ]
	//
	//    return POSSIBLE_PAGES[0];
}

export default App;
