import axios from "axios";

export const isLogged = (navigate) => {
  // If the session is expired, clear the token from localStorage
  localStorage.setItem("isLogged", "");
  if (navigate) navigate("/");
};
const makeRequest = async (url, method, body, type = 'private', navigate) => {
  try {
    // Make a GET request using Axios with the provided URL and HTTP method (defaulting to "get" if not provided)
    const result = await axios({
      method: method || "get",      
      url: "https://api.rocketadvance.ca/api" + url,
      data: body || undefined,
      headers: {
        "Authorization": localStorage.getItem("isLogged"),
        "Content-Type": "application/json"
      }
    });
    if (!localStorage.getItem("isLogged") && type == "private") {
      isLogged(navigate);
    }
    // If the request is successful, return the data from the response
    return result?.data;
  } catch (error) {
    const { response } = error;
    // Check if the error response contains the message "Session expired"
    if (
      response?.data?.message === "Invalid access token." ||
      response?.data?.message === "Unauthorized!" ||
      response.status === 401
    ) {
      isLogged(navigate);
    }
    // Return the error object
    return error;
  }
};

export default makeRequest;
