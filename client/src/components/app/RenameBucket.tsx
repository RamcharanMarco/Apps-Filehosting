import { FC, useState } from "react";
import "../../styles/renamebucket.scss";
import { useRenameBucket } from "../../hooks/useRenameBucket";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface AppProps {
  toggleRenameBucket: (params: any) => any;
}

const RenameBucket: FC<AppProps> = ({ toggleRenameBucket }) => {

  const { renameBucket, loading, error } = useRenameBucket();

  const [name, setName] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    renameBucket(name);
  };

  return (
    <div className="renamebucket">
      <h1>rename bucket</h1>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="new"
          />
          <button onClick={handleClick}>
            rename bucket
          </button>
        </div>

      <IoArrowBackCircleOutline
        className="cancel"
        onClick={toggleRenameBucket}
      />
    </div>
  );
};

export default RenameBucket;
