import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SignOutButtonProps {
    onPress: () => void;
}

const SignOutButton = ({ onPress }: SignOutButtonProps): React.JSX.Element => {
    return (
        <View className='justify-center items-end pr-6'>
            <Pressable onPress={onPress}>
                <Svg width={38} height={38} fill='none'>
                    <Path
                        stroke='#DE4523'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4.75 7.917v22.166M33.25 19H11.083m22.167 0-9.5 9.5m9.5-9.5-9.5-9.5'
                    />
                </Svg>
            </Pressable>
        </View>
    );
};

export default SignOutButton;
