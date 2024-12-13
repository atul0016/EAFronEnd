import jwtDecode from "jwt-decode";
import axios from "axios";
import Authdata from "./authservice";

interface UserData {
  accessToken: string; // Add the accessToken property
  // Add other properties of your user object if needed
}

interface DecodedToken {
  aud: string; // Adjust based on your JWT structure
}

const getuseremail = async (): Promise<string | null> => {
  const user = Authdata.getuserdata() as UserData | null; // Cast or ensure correct type
  
  if (user && user.accessToken) {
    const accessToken = user.accessToken;

    try {
      const decoded: DecodedToken = jwtDecode(accessToken);
      const id = decoded.aud;

      const sevurl = "http://localhost:5000/auth";
      const response = await axios.post<{ email: string }>(`${sevurl}/userid`, { id });

      console.log(response.data.email);
      return response.data.email;
    } catch (error) {
      console.error("Error decoding token or fetching email:", error);
      return null;
    }
  }

  return null;
};

export default getuseremail
