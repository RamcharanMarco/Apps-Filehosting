import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useUpload = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user } = useStore();
  const navigate = useNavigate();

  const upload = async (photo: any, bucketid: any) => {
    const body = { file: photo };
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `http://localhost:5000/api/file/${bucketid}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;
      setError(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading, error };
};
