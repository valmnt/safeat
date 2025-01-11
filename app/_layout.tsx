import { Stack } from 'expo-router';

import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function Layout(): React.JSX.Element {
    return (
        <GestureHandlerRootView>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
            <Toast />
        </GestureHandlerRootView>
    );
}
