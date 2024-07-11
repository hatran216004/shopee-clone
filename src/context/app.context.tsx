import { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getUserFromLS } from 'src/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    extendedPurchases: ExtendedPurchase[]
    setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
    reset: () => void
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()), // khi có access_token isAuthenticated sẽ là true, ngc lại là false
    setIsAuthenticated: () => null,
    user: getUserFromLS(),
    setUser: () => null,
    extendedPurchases: [],
    setExtendedPurchases: () => null,
    reset: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [user, setUser] = useState<User | null>(initialAppContext.user)
    const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
    const reset = () => {
        setIsAuthenticated(false)
        setUser(null)
        setExtendedPurchases([])
    }

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        extendedPurchases,
        setExtendedPurchases,
        reset
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
