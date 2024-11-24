import { Stack } from 'expo-router';

import '../global.css';

export default function Layout(): React.JSX.Element {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
