import "../styles/filecenter.scss";
import { useState } from "react";
import { useSendFiles } from "../hooks/useSendFiles";

const FileCenter = () => {
  const { sendFiles,loading,sent } = useSendFiles();

  const [files, setFiles] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState();
  const [arrayFiles, setArrayFiles] = useState<any>();

  const handleClick = (e: any) => {
    e.preventDefault();
    if(!arrayFiles){
      return
    }
  sendFiles(arrayFiles);
  return
  };

  let handleFiles = (e: any) => {
    setFiles(e.target.files); //files
    if(arrayFiles && arrayFiles.length > 0){
      setArrayFiles((prev:any) => prev.concat(files))
    }
    console.log("files", e.target.files);
    setSelectedImage(e.target.files[0]);
    setArrayFiles(Array.from(e.target.files));
  };

  let del = (e: any, i: any) => {
    e.preventDefault();
    let newList = arrayFiles.filter((f: any, index: any) => index !== i);
    setArrayFiles(newList);
    if (arrayFiles.length === 0) {
      setFiles("");
    }
  };

  const total = arrayFiles ? arrayFiles.reduce((total:any, item:any) => {
    return (total + item.size)
},0) : null

  return (
    <div className="addproject">
      <div className="photoupload">
        <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i>{files ? 'add more': 'choose files'}</label>
        <input
          id="file-upload"
          name="files"
          onChange={(e) => handleFiles(e)}
          type="file"
          multiple
        />
        {
          (arrayFiles && arrayFiles.length === 0) || files === ''  ? <p>no files chosen</p> : ''
        }
        <div>
          {/*
                selectedImage ?             <img
                src={URL.createObjectURL(selectedImage)}
                height={200}
                width={200}
                alt="Thumb"
              />
              :
              ''
  */}
          {arrayFiles
            ? 
            <div className="con">
              {
                            arrayFiles.map((file: any, i: any) => (
                              <div className="item">
                                {/*<img
                              src={URL.createObjectURL(file)}
                              height={200}
                              width={200}
                              alt="Thumb"
                            />*/}
                                {/*<p>{file.name.split(".")[0]}</p>*/}
                                <p>{file.name}</p>
                                <div>
                                <p>{Math.round(file.size * 0.001)} mb</p>
                                <button onClick={(e) => del(e, i)}>delete</button>
                                </div>
                                {/*<p>{file.type.split("/")[1]}</p>*/}
                              </div>
                            ))
              }
            </div>
            : ""}
            {
              arrayFiles ? <>
                          <p>{arrayFiles ? arrayFiles.length : null} files</p>
            <p>{arrayFiles ? Math.round(total* 0.001) : null}/1000mb</p>
              </>
              : null
            }

        </div>
        <button onClick={handleClick}>send files</button>
      </div>
    </div>
  );
};

export default FileCenter;
