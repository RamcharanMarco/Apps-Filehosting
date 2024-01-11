import '../../styles/preview.scss'
import {FC} from 'react'
import { useEffect, useState, useCallback } from "react";
import { useStore } from '../../store/store';
import { Link, useParams, useNavigate } from "react-router-dom";

interface Props {
    id: string;
    handleDelete: (e: any, fileid:string) => any;
    togglePreview: (e: any, fileid:string,) => any;
    downloadFile: (e: any, fileid:string, path:string,mime:string) => any;
}

const File: FC<Props> = ({id, handleDelete, downloadFile, togglePreview}) => {

  const { user } = useStore();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/file/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("no data");
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      console.log("bucket", json);
      setLoading(false);
      setData(json);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="preview">
        <h1>file preview</h1>
        <p>id {id}</p>
        {
          data ?
          <div className="box">
          <p>{data.filename}</p>
          <button onClick={(e) => handleDelete(e, data._id)}>
            delete
          </button>
          <button
            onClick={(e) =>
              downloadFile(e, data._id, data.path, data.mimetype)
            }
          >
            download
          </button>
          <button>{data.createdAt}</button>
          <button onClick={(e) => togglePreview(e, data._id)}>preview</button>
        </div>
        :
        null
        }

    </div>
  )
}

export default File