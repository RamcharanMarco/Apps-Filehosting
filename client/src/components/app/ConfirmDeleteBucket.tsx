import { FC, useState } from "react";
import "../../styles/confirmdeletebucket.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useDeleteBucket } from "../../hooks/useDeleteBucket";
interface AppProps {
  toggleDeleteBucket: (params: any) => any;
}

const ConfirmDeleteBucket: FC<AppProps> = ({ toggleDeleteBucket }) => {
  const { deleteBucket } = useDeleteBucket();

  const { bucketid } = useParams();

  const [val, setVal] = useState<string>("");

  return (
    <div className="confirmdeletebucket">
      <div>
        <h1>delete bucket</h1>
        <p>Once you delete the bucket, all files are gone also.</p>
        <p>
          please enter <i>delete my bucket</i>
        </p>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          disabled={val !== "delete bucket"}
          style={
            val !== "delete my account"
              ? { backgroundColor: "red" }
              : { backgroundColor: "black" }
          }
          onClick={() => deleteBucket(bucketid)}
        >
          delete
        </button>
      </div>

      <IoArrowBackCircleOutline
        className="cancel"
        onClick={toggleDeleteBucket}
      />

      {/* <button disabled={val !== 'delete bucket'} style={val !== 'delete my account' ? {backgroundColor:'red'}: {backgroundColor:'black'}} onClick={deleteAccount}>delete</button>*/}
    </div>
  );
};

export default ConfirmDeleteBucket;
