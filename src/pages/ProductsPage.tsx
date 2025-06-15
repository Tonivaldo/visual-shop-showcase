
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import Footer from "../components/Footer";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <ProductTable />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
