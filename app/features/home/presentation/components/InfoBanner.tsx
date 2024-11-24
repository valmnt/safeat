import i18n from '@/app/config/i18n';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const InfoBanner = (): React.JSX.Element => {
    return (
        <View className='w-full h-16 justify-center items-center mt-12'>
            <View className='lg:w-1/2 xl:w-5/12 bg-gray-100 flex-row w-11/12 h-full rounded-xl'>
                <View className='justify-top items-center mt-4 ml-6'>
                    <Svg width={19} height={19} fill='none'>
                        <Path
                            stroke='#333'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9.5 12.667V9.5m0-3.167h.008M17.417 9.5a7.917 7.917 0 1 1-15.834 0 7.917 7.917 0 0 1 15.834 0Z'
                        />
                    </Svg>
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
