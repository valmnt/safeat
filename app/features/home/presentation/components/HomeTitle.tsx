import i18n from '@/app/config/i18n';
import { View, Text } from 'react-native';

const HomeTitle = (): React.JSX.Element => {
    return (
        <View className='w-full h-24 pl-8 lg:pl-0 lg:items-center'>
            <Text className='text-black-100 font-bold text-6xl'>
                {i18n.t('Home.title.hello')}
            </Text>
            <Text className='text-black-100 text-4xl mt-2'>
                {i18n.t('Home.title.howAreYou')}
            </Text>
        </View>
    );
};

export default HomeTitle;
