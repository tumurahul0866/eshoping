import React, { useState } from 'react';

const ChangePictures = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Logic to upload and change picture
      console.log('Picture uploaded:', selectedFile.name);
    }
  };

  return (
    <div className="change-pictures">
      <h1>Change Pictures</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Picture:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ChangePictures;