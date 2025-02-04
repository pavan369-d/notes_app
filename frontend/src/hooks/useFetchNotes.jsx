import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNotesContext } from "../hooks/useNotesContext";
export const useFetchNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const { dispatch } = useNotesContext();

  const { user } = useAuthContext();

  const creatNotes = async (
    url,
    image,
    title,
    text,
    setText,
    setTitle,
    setImage
  ) => {
    if (image.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: text, images: image }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Failed to create note");
      }

      console.log(json);
      setImage([]); // Clear uploaded images
      setText("");
      setTitle("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotes = async (url) => {
    setIsLoading(true);
    setError(null);
    // console.log("User Token:", user?.token);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(response.error);
      }

      // console.log(data);
      dispatch({ type: "GET_NOTES", payload: data });
    } catch (error) {
      console.error("Error getting note:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotes = async (url, data) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("User Token:", user?.token);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json(); // Ensure JSON parsing before checking response

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update note");
      }

      console.log("Updated Note:", responseData);

      // Dispatch action to update only the modified note in state
      dispatch({ type: "UPDATE_NOTE", payload: responseData });
    } catch (error) {
      console.error("Error updating note:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotes = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("User Token:", user?.token);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const json = response.json();
      if (!response.ok) {
        throw new Error("Server error:" + response.status);
      } else {
        dispatch({ type: "UPDATE_NOTE", payload: null });
        console.log(json);
      }
    } catch (error) {
      console.error("Error Deleting note:", error);

      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getNotes, creatNotes, updateNotes, deleteNotes, isLoading, error };
};
