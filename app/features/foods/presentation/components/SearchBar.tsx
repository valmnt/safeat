import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: (text: string) => void;
    onClear: () => void;
    placeholder: string;
}

const SearchBar = ({
    value,
    onChangeText,
    onSubmit,
    onClear,
    placeholder,
}: SearchBarProps) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChangeText = (text: string) => {
        setLocalValue(text);
        onChangeText(text);
    };

    const handleClear = () => {
        setLocalValue('');
        onChangeText('');
        onClear();
    };

    return (
        <View className='mx-4 mt-4'>
            <View className='flex-row items-center bg-white-100 rounded-xl px-4 h-12'>
                <Ionicons
                    name='search'
                    size={20}
                    color='#555555'
                    className='mr-2'
                />
                <TextInput
                    className='flex-1 text-black-100 text-md'
                    placeholder={placeholder}
                    placeholderTextColor='#555555'
                    value={localValue}
                    onChangeText={handleChangeText}
                    onSubmitEditing={() => onSubmit(localValue)}
                    returnKeyType='search'
                />
                {localValue.length > 0 && (
                    <TouchableOpacity onPress={handleClear}>
                        <MaterialIcons name='clear' size={24} color='#DE4523' />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SearchBar;
