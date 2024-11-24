import i18n from '@/app/config/i18n';
import { Pressable, Text } from 'react-native';

interface SignInWithGoogleButtonProps {
    onPress: () => void;
}

const SignInWithGoogleButton = ({
    onPress,
}: SignInWithGoogleButtonProps): React.JSX.Element => {
    return (
        <Pressable
            className='
				bg-black-100
				w-80 md:w-96 xl:w-2/5
				h-14 md:h-18 lg:h-20
				justify-center
				items-center
				rounded-xl
				mt-8 md:mt-10 xl:mt-10
				active:scale-95'
            onPress={onPress}
        >
            <Text
                className='
					text-lg md:text-xl xl:text-2xl xxl:text-3xl 
					text-center text-white-100 font-semibold'
            >
                {i18n.t('Auth.googleSignInButton')}
            </Text>
        </Pressable>
    );
};

export default SignInWithGoogleButton;
