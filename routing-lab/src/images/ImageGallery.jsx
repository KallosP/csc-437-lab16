import { MainLayout } from "../MainLayout.jsx";
import "./ImageGallery.css";
import {Link} from 'react-router'

export function ImageGallery(props) {
    //const { isLoading, fetchedImages } = useImageFetching("");

    const imageElements = props.fetchedImages.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));
    return (
        <div>
            <h2>Image Gallery</h2>
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
        </div>
    );
}
