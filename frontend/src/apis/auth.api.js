import axios from "axios";
import config from "@/config/config";

export const login = async ({userEmail, userPassword}) => {
   const response = await axios.post(`${config.apiUrl}/users/login`, 
       {userEmail, userPassword} 
   );
   return response.data;
};

export const signUp = async ({userName, userEmail, userPassword, confirmPassword, userPhone, userAddress}) => {
   const response = await axios.post(`${config.apiUrl}/users/register`, 
      {userName, userEmail, userPassword, confirmPassword, userPhone, userAddress}
   );
   return response;
};