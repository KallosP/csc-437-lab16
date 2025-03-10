import { MainLayout } from '../MainLayout.jsx'
import { useImageFetching } from './useImageFetching.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'

export function ImageDetails(props) {
	const { imageId } = useParams()
	const { isLoading, fetchedImages } = useImageFetching(imageId, props.authToken/*, 500*/)
	if (isLoading) {
		return <div>Loading...</div>
	}
	const images = fetchedImages
	const imageData = images.find((image) => image._id === imageId)
	if (!imageData) {
		return (
			<div>
				<h2>Image not found</h2>
			</div>
		)
	}

	return (
		<div>
			<h2>{imageData.name}</h2>
			<img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
		</div>
	)
}
