import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()), // khi có access_token isAuthenticated sẽ là true, ngc lại là false
    setIsAuthenticated: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
