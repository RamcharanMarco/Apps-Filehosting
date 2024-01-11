import { useUpload } from "../../hooks/useUpload";
import "../../styles/uploadFiles.scss";
import { useEffect, useState, useCallback, FC } from "react";
import { useStore } from "../../store/store";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface AppProps {
  toggleFileUpload: (params: any) => any;
}

const UploadFiles: FC<AppProps> = ({ toggleFileUpload }) => {
  const { bucketid } = useParams();

  const { upload } = useUpload();

  const [file, setFile] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>("");

  const uploadFile = (e: any) => {
    e.preventDefault();
    upload(file, bucketid);
  };

  return (
    <div className="uploadFiles">
      <div>
        <label htmlFor="file-upload" className="custom-file-upload">
          {selectedImage ? "change" : "choose"}
        </label>
        <input
          type="file"
          name="file"
          className="file"
          onChange={(e: any) => {
            setFile(e.target.files[0]);
            setSelectedImage(e.target.files[0]);
          }}
          id="file-upload"
        />
        {selectedImage ? <h1>got files</h1> : ""}
        <button onClick={uploadFile}>upload files</button>
        <button onClick={toggleFileUpload}>cancel</button>
      </div>
      <IoArrowBackCircleOutline className="cancel" onClick={toggleFileUpload} />
    </div>
  );
};

export default UploadFiles;
