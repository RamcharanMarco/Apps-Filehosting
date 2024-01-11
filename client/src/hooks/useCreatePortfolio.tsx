import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useCreatePortfolio = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user } = useStore();
  const navigate = useNavigate();

  const createPortfolio = async (
    photo: string,
    name: string,
    surname: string,
    age: string,
    about: string
  ) => {
    const body = { photo, name, surname, age, about };
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

  return { createPortfolio, loading, error };
};
