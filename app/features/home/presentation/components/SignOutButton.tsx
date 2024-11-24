import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SignOutButtonProps {
    onPress: () => void;
}

const SignOutButton = ({ onPress }: SignOutButtonProps): React.JSX.Element => {
    return (
        <View className='justify-center items-end pr-6'>
            <Pressable onPress={onPress}>
                <MaterialIcons name='logout' size={36} color='#DE4523' />
            </Pressable>
        </View>
    );
};

export default SignOutButton;
