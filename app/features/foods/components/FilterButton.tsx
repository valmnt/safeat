import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterButtonProps {
    label: string;
    onPress: () => void;
    onLayout?: (width: number) => void;
}

const FilterButton = ({ label, onPress, onLayout }: FilterButtonProps) => (
    <Pressable
        className='flex-1 p-4 bg-white-100 rounded-xl m-2'
        onPress={onPress}
        onLayout={event => onLayout?.(event.nativeEvent.layout.width)}
    >
        <View className='flex-row justify-between items-center'>
            <Text
                className='text-black-100 text-md flex-1 mr-2'
                numberOfLines={1}
            >
                {label}
            </Text>
            <Ionicons name='chevron-down' size={24} color='#333333' />
        </View>
    </Pressable>
);

export default FilterButton;
