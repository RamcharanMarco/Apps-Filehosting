import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUpload } from "../hooks/useUpload";
import { useDeleteFile } from "../hooks/useDeleteFile";
import axios from "axios";
import download from "downloadjs";
import { useDeleteBucket } from "../hooks/useDeleteBucket";
import { useRenameBucket } from "../hooks/useRenameBucket";
import File from "../components/app/File";
import "../styles/bucket.scss";
import UploadFiles from "../components/app/UploadFiles";
import RenameBucket from "../components/app/RenameBucket";
import ConfirmDeleteBucket from "../components/app/ConfirmDeleteBucket";
import ConfirmDeleteAllFiles from "../components/app/ConfirmDeleteAllFiles";

const Bucket = () => {
  const { user } = useStore();
  const { bucketid } = useParams();

  const navigate = useNavigate();

  const { upload } = useUpload();
  const { deleteFile } = useDeleteFile();
  const { renameBucket } = useRenameBucket();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [name, setName] = useState<any>("");
  const [files, setFiles] = useState<any>([]);
  const [file, setFile] = useState<any>(null);
  const [Filesloading, setFilesLoading] = useState<any>(false);
  const [FilesError, setFilesError] = useState<any>(false);
  const [rename, setRename] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const [showfiles, setShowfiles] = useState<boolean>(true);
  const [showsettings, setShowsettings] = useState<boolean>(false);
  const [toggleUpload, setToggleUpload] = useState<boolean>(false);
  const [toggleRename, setToggleRename] = useState<boolean>(false);
  const [deleteBucket, setDeleteBucket] = useState<boolean>(false);
  const [deleteAllFiles, setDeleteAllFiles] = useState<boolean>(false);

  const [val, setVal] = useState<string>("");


  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/buckets/${bucketid}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      setData(json);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getFiles = useCallback(async () => {
    setFilesLoading(true);
    setFilesError(null);
    const response = await fetch(
      `http://localhost:5000/api/file/buckets/${bucketid}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setFilesLoading(false);
      setFilesError(true);
    }
    if (response.ok) {
      setFilesLoading(false);
      setFiles(json);
    }
  }, [user.token]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const uploadFile = (e: any) => {
    e.preventDefault();
    upload(file, bucketid);
  };

  const handleDelete = (e: any, id: any) => {
    e.preventDefault();
    deleteFile(id);
  };

  const downloadFile = async (e: any, id: any, name: string) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/file/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      link.download = name;
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadAllFiles = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/file/download/bucket/${bucketid}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      link.download = `zip.zip`;
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const togglePreview = (e: any, id: string) => {
    e.preventDefault();
    setId(id);
    setPreview(!preview);
  };

  const toggleShowFiles = (e: any) => {
    e.preventDefault();
    setShowsettings(false);
    setShowfiles(true);
  };

  const toggleShowSettings = (e: any) => {
    e.preventDefault();
    setShowfiles(false);

    setShowsettings(true);
  };

  const toggleFileUpload = (e: any) => {
    e.preventDefault();
    setToggleUpload(!toggleUpload);
  };

  const toggleRenameBucket = (e: any) => {
    e.preventDefault();
    setRename(!rename);
  };

  const toggleDeleteBucket = (e: any) => {
    e.preventDefault();
    setDeleteBucket(!deleteBucket);
  };

  function copy(e:any, path:string){
    navigator.clipboard.writeText(path);
    alert("Copied the text");
  }

  const toggleDeleteAllFiles = (e: any) => {
    e.preventDefault();
    setDeleteAllFiles(!deleteAllFiles);
  };

  return (
    <div className="bucket">
      {toggleUpload ? (
        <UploadFiles toggleFileUpload={toggleFileUpload} />
      ) : null}
      {rename ? <RenameBucket toggleRenameBucket={toggleRenameBucket} /> : null}
      {deleteBucket ? (
        <ConfirmDeleteBucket toggleDeleteBucket={toggleDeleteBucket} />
      ) : null}
      {deleteAllFiles ? (
        <ConfirmDeleteAllFiles toggleDeleteAllFiles={toggleDeleteAllFiles} />
      ) : null}
      {preview ? (
        <File
          downloadFile={downloadFile}
          handleDelete={handleDelete}
          togglePreview={togglePreview}
          id={id}
        />
      ) : null}
      <div className="bucketnav">
        <button onClick={toggleShowFiles}>files</button>
        <button onClick={toggleShowSettings}>settings</button>
      </div>
      <div className="con">
        {showfiles ? (
          <div className="addfiles">
            <h1 className="files-heading">files</h1>
            <h2 className="files-subheading">files(2)</h2>
            <button onClick={toggleFileUpload}>upload</button>
            <input 
        value={val}
        onChange={(e) => setVal(e.target.value)}
        type="text" placeholder="findbyname" />            <div className="fileslist">
<table>
  <tr className="head">
    <th>no</th>
    <th>name</th>
    <th>created</th>
    <th>settings</th>
  </tr>
{files && files.length > 0 ? (
  files.map((file: any, index: any) => {
    if(file.filename.includes(val)){
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{file.filename}</td>
          <td>{file.createdAt}</td>
          <td className="file-settings">
            <button onClick={(e) => handleDelete(e, file._id)}>
              delete
            </button>
            <button
              onClick={(e) =>
                downloadFile(e, file._id, file.filename)
              }
            >
              download
            </button>
            <button onClick={(e:any) => copy(e, file.path)}>copy url</button>
            {/*<button onClick={(e) => togglePreview(e, file._id)}>
            more
          </button>*/}
        </td>
        </tr>
      );                  }

  })
) : (
  <p>no files</p>
)}

</table>
            </div>
          </div>
        ) : null}
        {showsettings ? (
          <div className="bucketSettings">
            <div>
              <h1>name: {data ? data.name : ""}</h1>
              <h1>created at: {data ? data.createdAt : ""}</h1>
            </div>
            <div>
              <h1>rename bucket</h1>
              <button onClick={toggleRenameBucket}>rename</button>
            </div>
            <div>
              <h1>delete bucket</h1>
              <button onClick={toggleDeleteBucket}>delete bucket</button>
            </div>
            <div>
              <h1>delete all files</h1>
              <button onClick={toggleDeleteAllFiles}> delete all files </button>
            </div>
            {files && files.length > 0 ? (
              <div>
                <h1>download all files</h1>
                <button onClick={downloadAllFiles}>download all files</button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <hr />
    </div>
  );
};

export default Bucket;
