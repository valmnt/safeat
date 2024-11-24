import i18n from '@/app/config/i18n';
import { View, Text, Image } from 'react-native';

const IllustrationBanner = (): React.JSX.Element => {
    return (
        <View className='w-full h-40 justify-top items-center mt-8'>
            <View className='w-11/12 lg:w-1/2 xl:w-5/12  flex-row bg-green-200 rounded-3xl'>
                <View className='w-1/2 h-full justify-center items-center'>
                    <Text className='text-black-100 text-lg font-medium leading-normal'>
                        {i18n.t('Home.illustrationBanner')}
                    </Text>
                </View>
                <View className='w-1/2 h-full justify-center items-center absolute right-5 pb-2'>
                    <Image
                        className='w-72 h-48 relative bottom-2'
                        source={require('@/assets/images/png/think.png')}
                    />
                </View>
            </View>
        </View>
    );
};

export default IllustrationBanner;
