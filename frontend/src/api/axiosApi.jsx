import axios from "axios";

const axiosAPI = () => {
  const token =  localStorage.getItem("BidA2ZUser");
  return axios.create({
    baseURL: window.location.hostname === "localhost"
  ? "http://localhost:5000/api" // Local development URL
  : "https://bidding-gamma.vercel.app/api", 
    headers: {
      Authorization: `Bearer ${token ? `${token}` : ""}`,
    },
  });
};

export default axiosAPI;
