import { Text } from 'react-native';
import i18n from '@/app/config/i18n';

const AuthSubtitle = (): React.JSX.Element => {
    return (
        <Text
            className='
				text-sm md:text-md lg:text-xl
				text-center text-gray-200
				mt-4 md:mt-7'
        >
            {i18n.t('Auth.noAccountInfo')}
        </Text>
    );
};

export default AuthSubtitle;
