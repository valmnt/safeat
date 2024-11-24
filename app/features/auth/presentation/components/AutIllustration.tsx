import { Image } from 'react-native';

const AuthIllustration = (): React.JSX.Element => {
    return (
        <Image
            className='
				w-96 lg:w-1/2
				h-96 lg:h-1/2 xxl:h-1/2
				justify-center
				items-center'
            source={require('@/assets/images/png/food.png')}
        />
    );
};

export default AuthIllustration;
