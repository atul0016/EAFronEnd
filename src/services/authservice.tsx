import axios from "axios";

const sevurl = "http://localhost:5000/auth";

interface RegisterResponse {
  details?: { [key: string]: any }[];
  message?: string;
  accessToken?: string;
}

interface LoginResponse {
  details?: { [key: string]: any }[];
  message?: string;
  accessToken?: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

const register = async (
  name: string,
  email: string,
  password: string,
  cpassword: string
): Promise<string | RegisterResponse | undefined> => {
  try {
    const response = await axios.post<RegisterResponse>(`${sevurl}/register`, {
      name,
      email,
      password,
      cpassword,
    });

    if (response.data.details?.[0]) {
      return response.data.details[0];
    }
    if (response.data.message) {
      return response.data;
    }
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error:any) {
    console.error("Error in register:", error);
    return error;
  }
};

const login = async (
  email: string,
  password: string
): Promise<string | LoginResponse | undefined> => {
  try {
    const response = await axios.post<LoginResponse>(`${sevurl}/login`, {
      email,
      password,
    });

    if (response.data.details?.[0]) {
      return response.data.details[0];
    }
    if (response.data.message) {
      return response.data;
    }
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error:any) {
    console.error("Error in login:", error);
    return error;
  }
};

const logout = (): void => {
  localStorage.removeItem("user");
};

// Get user data function
const getuserdata = (): UserData | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get cart items function
const getCartItems = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${sevurl}/cart`, { email });
    return response.data;
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return null;
  }
};

// Exporting functions as a single object
const authdata = { register, login, logout, getuserdata, getCartItems };
export default authdata;
