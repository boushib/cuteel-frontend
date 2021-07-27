import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
)

export default Layout
