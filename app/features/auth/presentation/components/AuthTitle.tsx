import i18n from '@/app/config/i18n';
import { Text } from 'react-native';

const AuthTitle = (): React.JSX.Element => {
    return (
        <Text
            className='
				w-full mt-10
				text-md md:text-lg xl:text-2xl xxl:text-3xl
				text-center text-gray-300'
        >
            {i18n.t('Auth.description')}
        </Text>
    );
};

export default AuthTitle;
