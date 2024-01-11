import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface link {
  url: string;
  name: string;
}

export const useCreateLinkBio = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user } = useStore();
  const navigate = useNavigate();

  const createlinkbio = async (photo: string, name: string, links: link[]) => {
    const body = { photo, name, links };
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/projects",
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
      navigate(`/user/${user.user._id}/projects`);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { createlinkbio, loading, error };
};
