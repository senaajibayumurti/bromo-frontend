// components/hoc/withSidebarLoaded.jsx
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Topbar_dashboard from '../TopBar/Topbar_dashboard';

const withSidebarLoaded = (WrappedComponent) => {
    return (props) => {
        const [sidebarLoaded, setSidebarLoaded] = useState(false);

        if (!sidebarLoaded) {
            return (
                <>
                    <Sidebar setSidebarLoaded={setSidebarLoaded} />
                    <Topbar_dashboard />
                </>
            );
        }

        return (
            <>
                <Sidebar setSidebarLoaded={setSidebarLoaded} />
                <Topbar_dashboard />
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withSidebarLoaded;
