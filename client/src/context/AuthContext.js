import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE={
    user:{"_id":"66774677a6ec30083dbe9158","username":"jane","email":"jane@gmail.com","password":"jane123","profilePicture":"","coverPicture":"","followers":["66774b1f78b7e0eec8f58fc2"],"following":["6677400471a5bc2f4457592c"],"isAdmin":false,"createdAt":{"$date":{"$numberLong":"1719092855646"}},"updatedAt":{"$date":{"$numberLong":"1719119538579"}},"__v":{"$numberInt":"0"},"city":"Los Angeles","desc":"Hey there","from":"Madrid"},
    isFetching:false,
    error:false
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{user:state.user,
                isFetching:state.isFetching,
                errot:state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    );
}