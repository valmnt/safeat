import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState, useCallback } from 'react';
import useBottomSheetStore from '../stores/bottomSheetStore';
import useFoodStore from '../stores/foodStore';
import { Pressable, Text, View } from 'react-native';
import FoodCard from './FoodCard';
import { ScrollView } from 'react-native-gesture-handler';
import { FoodStatusType } from '../models/FoodStatus';
import i18n from '@/app/config/i18n';
import useInsertUserFoodStatus from '../hooks/useInsertUserFoodStatus';
import Food from '../models/Food';
import { ActivityIndicator } from 'react-native';

const FoodBottomSheet = (): React.JSX.Element => {
    const insertUserFoodStatus = useInsertUserFoodStatus();
    const { setBottomSheet, closeBottomSheet } = useBottomSheetStore();
    const { selectedFood, updateSelectedFoodStatus } = useFoodStore();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [localFoods, setLocalFoods] = useState<Food[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setBottomSheet(bottomSheetRef);
        setLocalFoods(
            Object.values(FoodStatusType).map(status => ({
                ...selectedFood,
                status: { ...selectedFood.status, type: status },
            })),
        );
    }, [selectedFood]);

    const handleCardPress = (index: number) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };

    const handleSheetChanges = (index: number) => {
        if (index === -1) {
            setSelectedIndex(null);
        }
    };

    const handleConfirm = () => {
        if (selectedIndex !== null) {
            setIsLoading(true);
            const selectedFood = localFoods[selectedIndex];
            insertUserFoodStatus(
                selectedFood.id,
                selectedFood.status.type,
                () => {
                    updateSelectedFoodStatus(
                        selectedFood.id,
                        selectedFood.status.type,
                    );
                    closeBottomSheet();
                },
                () => {
                    setIsLoading(false);
                },
            );
        }
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        [],
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView className='p-2'>
                <BottomSheetHeader foodName={selectedFood.name} />
                <FoodStatusSelector
                    foods={localFoods}
                    onPress={handleCardPress}
                    selectedIndex={selectedIndex}
                />
                <SubmitStatusButton
                    isLoading={isLoading}
                    onPress={handleConfirm}
                    selectedIndex={selectedIndex}
                />
            </BottomSheetView>
        </BottomSheet>
    );
};

interface BottomSheetHeaderProps {
    foodName: string;
}

const BottomSheetHeader = ({
    foodName,
}: BottomSheetHeaderProps): React.JSX.Element => {
    return <Text className='text-4xl font-bold p-4 mb-2'>{foodName}</Text>;
};

interface FoodStatusSelectorProps {
    foods: Food[];
    onPress: (index: number) => void;
    selectedIndex: number | null;
}

const FoodStatusSelector = ({
    foods,
    onPress,
    selectedIndex,
}: FoodStatusSelectorProps): React.JSX.Element => {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}
        >
            {foods.map((food, index) => (
                <View key={index} className='flex-1 mr-6'>
                    <FoodCard
                        food={food}
                        onPress={() => onPress(index)}
                        isSelected={selectedIndex === index}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

interface SubmitStatusButtonProps {
    isLoading: boolean;
    onPress: () => void;
    selectedIndex: number | null;
}

const SubmitStatusButton = ({
    isLoading,
    onPress,
    selectedIndex,
}: SubmitStatusButtonProps): React.JSX.Element => {
    return (
        <View className='h-24 justify-center items-center'>
            {isLoading ? (
                <ActivityIndicator size='small' />
            ) : (
                <Pressable
                    className='
						bg-black-100
						w-80
						h-14
						justify-center
						items-center
						rounded-xl
						active:scale-95
						mt-2'
                    onPress={onPress}
                    disabled={selectedIndex === null}
                >
                    <Text
                        className='
							text-lg md:text-xl xl:text-2xl xxl:text-3xl 
							text-center text-white-100 font-semibold'
                    >
                        {i18n.t('Common.actions.confirm')}
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

export default FoodBottomSheet;
