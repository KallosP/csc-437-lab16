import { Homepage } from './Homepage'
import { AccountSettings } from './AccountSettings'
import { ImageGallery } from './images/ImageGallery.jsx'
import { ImageDetails } from './images/ImageDetails.jsx'
import { MainLayout } from './MainLayout.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Header } from './Header'
import { useEffect, useState } from 'react'
import { useImageFetching } from "./images/useImageFetching.js";

function App() {
	const [accountName, setAccountName] = useState('')

    const { isLoading, fetchedImages } = useImageFetching("");

	const handleAccountNameChange = (event) => {
		setAccountName(event.target.value)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Homepage userName={accountName} />} />
					<Route
						path="/account"
						element={<AccountSettings setUserName={handleAccountNameChange} />}
					/>
					<Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages}/>} />
					<Route path="/images/:imageId" element={<ImageDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
	//    const POSSIBLE_PAGES = [
	//        <Homepage userName="John Doe" />,
	//        <AccountSettings />,
	//        <ImageGallery />,
	//        <ImageDetails imageId="0" />
	//    ]
	//
	//    return POSSIBLE_PAGES[0];
}

export default App
