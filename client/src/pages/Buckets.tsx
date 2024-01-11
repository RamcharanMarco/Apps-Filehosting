import "../styles/buckets.scss";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams, useNavigate } from "react-router-dom";
import CreateBucket from "../components/app/CreateBucket";
import Moment from "react-moment";

const Buckets = () => {
  const { user } = useStore();
  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [name, setName] = useState<any>("");
  const [create, setCreate] = useState<boolean>(false);

  const [val, setVal] = useState<string>("");

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/buckets/user/${id}`,
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
      console.log("user buckets", json);
      setLoading(false);
      setData(json);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const toggle = (e: any) => {
    e.preventDefault();
    setCreate(!create);
  };

  return (
    <div className="buckets">
      <h1>BUCKETS</h1>
      {create ? <CreateBucket toggle={toggle} /> : null}
      <button onClick={toggle}>create bucket</button>
      <div className="search">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          type="text"
          placeholder="findbyname"
        />
      </div>
      <div className="bucketlist">
        {data.length === 0 ? (
          "you have no buckets"
        ) : data.length !== 0 ? (
          <div className="bucketlist-list">
            <table>
              <tr className="head">
                <th>no</th>
                <th>name</th>
                <th>created</th>
                <th>files</th>
              </tr>
              {data.map((b: any, i: any) => {
                if (b.name.includes(val)) {
                  return (
                    <tr key={b._id}>
                      <td>{i + 1}</td>
                      <td>
                        <Link to={`/console/${id}/buckets/${b._id}`}>
                          {b.name}
                        </Link>
                      </td>
                      <td>{b.createdAt}</td>
                      <td>5 files</td>
                    </tr>
                  );
                }
              })}
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Buckets;
