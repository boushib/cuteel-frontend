import Link from 'next/link'
import Head from '../../components/Head'

const Products = () => (
  <div className="products page">
    <Head title="Products" />
    <div className="container">
      <h1>Catalog</h1>
      <Link href="/">Go Home</Link>
    </div>
  </div>
)

export default Products
