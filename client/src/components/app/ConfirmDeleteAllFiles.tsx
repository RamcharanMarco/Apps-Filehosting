import { FC, useState } from "react";
import "../../styles/confirmdeleteallfiles.scss";
import { useDeleteAllFiles } from "../../hooks/useDeleteAllFiles";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

interface AppProps {
  toggleDeleteAllFiles: (params: any) => any;
}

const ConfirmDeleteAllFiles: FC<AppProps> = ({ toggleDeleteAllFiles }) => {
  const { bucketid } = useParams();

  const [val, setVal] = useState<string>("");
  const { deleteAllFiles } = useDeleteAllFiles();

  return (
    <div className="confirmdeleteallfiles">
      <div>
        <h1>delete all files</h1>
        <p>All files will be deleted</p>
        <p>
          please enter <i>delete files</i>
        </p>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          disabled={val !== "delete files"}
          style={
            val !== "delete my account"
              ? { backgroundColor: "red" }
              : { backgroundColor: "black" }
          }
          onClick={() => deleteAllFiles(bucketid)}
        >
          delete
        </button>
      </div>

      <IoArrowBackCircleOutline
        className="cancel"
        onClick={toggleDeleteAllFiles}
      />

      {/* <button disabled={val !== 'delete bucket'} style={val !== 'delete my account' ? {backgroundColor:'red'}: {backgroundColor:'black'}} onClick={deleteAccount}>delete</button>*/}
    </div>
  );
};

export default ConfirmDeleteAllFiles;
