import '@styles/globals.css'
import { UserContextProvider } from "./context/UserContext"

export const metadata = {
  title: "CryDB",
  description: 'Document Data Store'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}

export default RootLayout;