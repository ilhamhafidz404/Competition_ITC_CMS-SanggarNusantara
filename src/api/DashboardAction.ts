import axios from "axios";

// GET
const getDashboard = async () => {
  try {
    const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`
      `http://127.0.0.1:8000/api/dashboard`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

export default getDashboard;
