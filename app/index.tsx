import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { registerRootComponent } from 'expo';

export default function App(): React.JSX.Element {
    return (
        <View className='w-full h-full justify-center items-center'>
            <Text className='text-xl font-bold'>
                Open up App.tsx to start working
            </Text>
            <StatusBar style='auto' />
        </View>
    );
}

registerRootComponent(App);
