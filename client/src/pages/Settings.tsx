import "../styles/settings.scss";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { Link, useParams, useNavigate } from "react-router-dom";
import ConfirmDeleteAccount from "../components/app/ConfirmDeleteAccount";
import ConfirmLogout from "../components/app/ConfirmLogout";

const Settings = () => {
  const { user } = useStore();
  const { id } = useParams();
  const [deleteAcc, setDeleteAcc] = useState(false);
  const [changePwd, setChangePwd] = useState(false);

  const [logout, setLogout] = useState(false);


  const { deleteAccount } = useDeleteAccount();

  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    deleteAccount();
  };

  const toggleDeleteAccount = (e: any) => {
    e.preventDefault();
    setDeleteAcc(!deleteAcc);
  };

  const toggleLogout = (e: any) => {
    e.preventDefault();
    setLogout(!logout);
  };

  return (
    <div className="settings">
      {deleteAcc ? (
        <ConfirmDeleteAccount toggleDeleteAccount={toggleDeleteAccount} />
      ) : null}
            {logout ? (
        <ConfirmLogout toggleLogout={toggleLogout} />
      ) : null}
      <h1>settings</h1>
      <div>
        <p>email : {user.user.email}</p>
        <p>joined: {user.user.createdAt}</p>
      </div>
      <div>
        <button onClick={toggleLogout}>logout</button>
      </div>
      <div>
        <p>delete account</p>
        <button onClick={() => setDeleteAcc(!deleteAcc)}>delete account</button>
      </div>
    </div>
  );
};

export default Settings;
