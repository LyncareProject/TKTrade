import React, { useState } from 'react';

const ImageUploader = ({ selectedImages, setSelectedImages }) => {

    const handleImageChange = (e) => {
        const files = e.target.files;
        const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
        setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    };

    const handleImageRemove = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    return (
    <div>
        <input type="file" multiple onChange={handleImageChange} />
        <div>
            {
                selectedImages.map((image, index) => (
                <div key={index} onClick={() => handleImageRemove(index)}>
                    <img src={image} alt={`Image ${index}`} onClick={() => handleImageRemove(index)}/>
                </div>
                ))
            }
        </div>
    </div>
    );
};

export default ImageUploader;