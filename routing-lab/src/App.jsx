import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Routes, Route } from 'react-router';
import {Header} from "./Header";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage userName="John Doe" />} />
                <Route path="/images" element={<ImageGallery />} />
                <Route path="/account" element={<AccountSettings />} />
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
