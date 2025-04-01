import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function PrimaryLayout({ children }) {
    return (
        <div className="">
            <Header />
            <div className="bg-[#f5f5f5] px-40 pb-12 pt-6">{children}</div>
            <Footer />
        </div>
    );
}

export default PrimaryLayout;
