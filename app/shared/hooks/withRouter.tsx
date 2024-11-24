import React from 'react';
import { useRouter } from 'expo-router';

const withRouter = (
    Component: React.ComponentType<any>,
): {
    (props: any): React.JSX.Element;
    displayName: string;
} => {
    const WrappedComponent = (props: any) => {
        const router = useRouter();
        return <Component {...props} router={router} />;
    };

    WrappedComponent.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withRouter;
