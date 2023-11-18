import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '../redux/actions/user';
import PulseLoader from '../components/loaders/pulseLoader';

function PageLayout() {
    const { loading } = useSelector((state) => state.client);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, []);

    if (loading) {
        return <PulseLoader />;
    }

    return (
        <div className="relative overflow-x-hidden overflow-y-auto  w-ful flex flex-col ">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default PageLayout;
