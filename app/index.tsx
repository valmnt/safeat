import { registerRootComponent } from 'expo';
import AuthView from './presentation/views/auth/auth-view';
import Toast from 'react-native-toast-message';

export default function App(): React.JSX.Element {
    return (
        <>
            <AuthView />
            <Toast />
        </>
    );
}

registerRootComponent(App);
