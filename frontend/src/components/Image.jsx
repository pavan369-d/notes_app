function Image({ image, handleImages }) {
  return (
    <div className="text-container">
         
     
      <input
        id="fileInput"
        type="file"
        accept="image/"
        onChange={handleImages}
        style={{ display: "none" }}
      />

      <label htmlFor="fileInput" className="label-fileInput">
       
        {image? (<i className="ri-add-line"></i>):(  <i className="ri-file-image-line"></i>)}
      
      </label>
    </div>
  );
}

export default Image;
