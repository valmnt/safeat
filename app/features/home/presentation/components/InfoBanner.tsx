import i18n from '@/app/config/i18n';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const InfoBanner = (): React.JSX.Element => {
    return (
        <View className='w-full h-16 justify-center items-center mt-12'>
            <View className='lg:w-1/2 xl:w-5/12 bg-gray-100 flex-row w-11/12 h-full rounded-xl'>
                <View className='justify-top items-center mt-4 ml-6'>
                    <MaterialIcons name='info-outline' size={22} color='#333' />
                </View>
                <View className='flex-1 justify-center ml-4'>
                    <Text className='text-gray-300 text-xs font-medium leading-normal'>
                        {i18n.t('Home.infoBanner')}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default InfoBanner;
