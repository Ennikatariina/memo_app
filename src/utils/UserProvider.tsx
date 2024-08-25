import React, { createContext, useContext, useState} from 'react';

const UserContext = createContext<{ user: string | null, setUser: React.Dispatch<React.SetStateAction<string | null>>, role:string |null, setRole: React.Dispatch<React.SetStateAction<string | null>> }>({
    user: null,
    setUser: () => null,
    role: null,
    setRole: () => null
  });

export const UserProvider = ({children}: { children: React.ReactNode }) => {
  const [user, setUser ] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

    return (
        <UserContext.Provider value={{user, setUser, role, setRole}}>
            {children}
        </UserContext.Provider>
    )
} 
export const useUser = () => useContext(UserContext) 