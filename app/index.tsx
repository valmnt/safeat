import { registerRootComponent } from 'expo';
import AuthScreen from './presentation/screens/auth';

export default function App(): React.JSX.Element {
    return <AuthScreen />;
}

registerRootComponent(App);
