import {
    Modal,
    Platform,
    TouchableOpacity,
    View,
    Text,
    Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import i18n from '@/app/config/i18n';

interface PickerHeaderProps {
    title: string;
    onCancel: () => void;
    onValidate: () => void;
}

const PickerHeader = ({ title, onCancel, onValidate }: PickerHeaderProps) => (
    <View className='flex-row justify-between items-center p-4 border-b border-gray-100'>
        <TouchableOpacity onPress={onCancel}>
            <Text className='text-red-100'>{i18n.t('Foods.cancel')}</Text>
        </TouchableOpacity>
        <Text className='text-lg font-medium text-black-100'>{title}</Text>
        <TouchableOpacity onPress={onValidate}>
            <Text className='text-black-100 font-medium'>
                {i18n.t('Foods.validate')}
            </Text>
        </TouchableOpacity>
    </View>
);

interface PickerItemProps {
    item: {
        label: string;
        value: string;
    };
    isSelected: boolean;
    isLast: boolean;
    onSelect: () => void;
}

const PickerItem = ({
    item,
    isSelected,
    isLast,
    onSelect,
}: PickerItemProps) => (
    <Pressable
        onPress={onSelect}
        className={`p-4 active:bg-gray-100 ${
            !isLast ? 'border-b border-gray-100' : ''
        }`}
    >
        <Text className={`text-black-100 ${isSelected ? 'font-medium' : ''}`}>
            {item.label}
        </Text>
    </Pressable>
);

interface PlatformPickerProps {
    visible: boolean;
    title: string;
    selectedValue: string;
    onClose: () => void;
    onSelect: (value: string) => void;
    items: Array<{ label: string; value: string }>;
    buttonWidth?: number;
    position?: 'left' | 'right';
}

const PlatformPicker = ({
    visible,
    title,
    selectedValue,
    onClose,
    onSelect,
    items,
    buttonWidth,
    position = 'left',
}: PlatformPickerProps) => {
    const [tempValue, setTempValue] = useState(selectedValue);

    useEffect(() => {
        setTempValue(selectedValue);
    }, [selectedValue]);

    if (Platform.OS === 'ios') {
        return (
            <IOSPicker
                {...{
                    visible,
                    title,
                    tempValue,
                    setTempValue,
                    selectedValue,
                    onClose,
                    onSelect,
                    items,
                }}
            />
        );
    }

    return (
        <AndroidPicker
            {...{
                visible,
                selectedValue,
                onClose,
                onSelect,
                items,
                buttonWidth,
                position,
            }}
        />
    );
};

interface IOSPickerProps {
    visible: boolean;
    title: string;
    tempValue: string;
    setTempValue: (value: string) => void;
    selectedValue: string;
    onClose: () => void;
    onSelect: (value: string) => void;
    items: Array<{ label: string; value: string }>;
}

const IOSPicker = ({
    visible,
    title,
    tempValue,
    setTempValue,
    selectedValue,
    onClose,
    onSelect,
    items,
}: IOSPickerProps) => (
    <Modal visible={visible} transparent animationType='slide'>
        <View className='flex-1 justify-end'>
            <View className='bg-white-100 rounded-t-xl shadow-xl'>
                <PickerHeader
                    title={title}
                    onCancel={() => {
                        setTempValue(selectedValue);
                        onClose();
                    }}
                    onValidate={() => {
                        onSelect(tempValue);
                        onClose();
                    }}
                />
                <Picker selectedValue={tempValue} onValueChange={setTempValue}>
                    {items.map(item => (
                        <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    </Modal>
);

interface AndroidPickerProps {
    visible: boolean;
    selectedValue: string;
    onClose: () => void;
    onSelect: (value: string) => void;
    items: Array<{ label: string; value: string }>;
    buttonWidth?: number;
    position?: 'left' | 'right';
}

const AndroidPicker = ({
    visible,
    selectedValue,
    onClose,
    onSelect,
    items,
    buttonWidth,
    position,
}: AndroidPickerProps) => {
    if (!visible) return null;

    const style = buttonWidth ? { width: buttonWidth } : undefined;
    const positionStyle = position === 'right' ? 'items-end' : 'items-start';

    return (
        <>
            <TouchableOpacity
                className='absolute inset-0 bg-black-100/10 z-40'
                onPress={onClose}
            />
            <View
                className={`absolute top-40 left-0 right-0 z-50 ${positionStyle}`}
            >
                <View
                    style={style}
                    className='mx-4 bg-white-100 rounded-xl shadow-xl overflow-hidden'
                >
                    {items.map((item, index) => (
                        <PickerItem
                            key={item.value}
                            item={item}
                            isSelected={selectedValue === item.value}
                            isLast={index === items.length - 1}
                            onSelect={() => {
                                onSelect(item.value);
                                onClose();
                            }}
                        />
                    ))}
                </View>
            </View>
        </>
    );
};

export default PlatformPicker;
