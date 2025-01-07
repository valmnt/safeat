import {
    View,
    ActivityIndicator,
    FlatList,
    useWindowDimensions,
    Text,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import useFoodStore from '@/app/shared/stores/foodStore';
import useCategoryStore from '@/app/shared/stores/categoryStore';
import useBottomSheetStore from '@/app/shared/stores/bottomSheetStore';
import useFetchFoods from '../hooks/useFetchFoods';
import Food from '@/app/shared/models/Food';
import Category from '@/app/shared/models/Category';
import i18n from '@/app/config/i18n';
import FilterButton from './components/FilterButton';
import PlatformPicker from './components/PlatformPicker';
import SearchBar from './components/SearchBar';
import FoodCard from '@/app/shared/components/FoodCard';
import { useLocalSearchParams } from 'expo-router';
import { FoodStatusType } from '@/app/shared/models/FoodStatus';

type LoadingState = 'initial' | 'more' | 'ready';

const FoodsScreen = () => {
    const { foods, setFoods, setSelectedFood } = useFoodStore();
    const { categories } = useCategoryStore();
    const { openBottomSheet } = useBottomSheetStore();
    const fetchFoods = useFetchFoods();
    const { width: screenWidth } = useWindowDimensions();
    const { selectedCategory: initialCategory } = useLocalSearchParams<{
        selectedCategory?: string;
    }>();

    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>(
        initialCategory || 'all',
    );
    const [isCategoryPickerVisible, setCategoryPickerVisible] = useState(false);
    const [isStatusPickerVisible, setStatusPickerVisible] = useState(false);
    const [loadingState, setLoadingState] = useState<LoadingState>('initial');
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [categoryButtonWidth, setCategoryButtonWidth] = useState(0);
    const [statusButtonWidth, setStatusButtonWidth] = useState(0);
    const [search, setSearch] = useState('');
    const [hasError, setHasError] = useState(false);

    const CARD_MARGIN = 2;
    const CARD_WIDTH = 120;
    const numColumns = Math.floor(screenWidth / (CARD_WIDTH + CARD_MARGIN * 2));
    const itemWidth = (screenWidth - CARD_MARGIN * 2 * numColumns) / numColumns;

    const LIMIT = numColumns >= 7 ? 60 : numColumns > 5 ? 45 : 20;

    const handleCategorySelect = (value: string) => {
        setSelectedCategory(value);
        setCategoryPickerVisible(false);
    };

    const handleStatusSelect = (value: string) => {
        setSelectedStatus(value);
        setStatusPickerVisible(false);
    };

    const handleSearchChange = (text: string) => {
        setSearch(text);
    };

    const handleSearchSubmit = () => {
        setOffset(0);
        setHasMore(true);
        loadFoods(0, true);
    };

    const handleSearchClear = () => {
        setSearch('');
        setOffset(0);
        setHasMore(true);
    };

    useEffect(() => {
        if (!search) {
            loadFoods(0, true);
        }
    }, [search]);

    useEffect(() => {
        setOffset(0);
        setHasMore(true);
        loadFoods(0, true);
    }, [selectedCategory, selectedStatus]);

    const loadFoods = useCallback(
        async (currentOffset: number, isInitial = false) => {
            setLoadingState(isInitial ? 'initial' : 'more');

            if (isInitial) {
                setFoods([]);
            }

            fetchFoods(
                newFoods => {
                    if (newFoods.length < LIMIT) {
                        setHasMore(false);
                    }
                    setFoods(isInitial ? newFoods : [...foods, ...newFoods]);
                },
                () => {
                    setHasError(true);
                },
                () => {
                    setLoadingState('ready');
                },
                LIMIT,
                search,
                selectedCategory,
                selectedStatus,
                currentOffset,
            );
        },
        [foods, search, selectedCategory, selectedStatus],
    );

    const handleLoadMore = () => {
        if (loadingState === 'ready' && hasMore) {
            const nextOffset = offset + LIMIT;
            setOffset(nextOffset);
            loadFoods(nextOffset, false);
        }
    };

    const handlePress = (food: Food) => {
        setSelectedFood(food);
        openBottomSheet();
    };

    const getSelectedCategoryName = () => {
        if (selectedCategory === 'all')
            return i18n.t('Foods.filters.allCategories').toString();
        const category = categories.find(c => c.id === selectedCategory);
        return (
            category?.name || i18n.t('Foods.filters.allCategories').toString()
        );
    };

    const getSelectedStatusName = () => {
        switch (selectedStatus) {
            case 'all':
                return i18n.t('Foods.filters.allStatus');
            case FoodStatusType.tolerated:
                return i18n.t('Foods.status.tolerated');
            case FoodStatusType.not_tolerated:
                return i18n.t('Foods.status.not_tolerated');
            case FoodStatusType.suspected:
                return i18n.t('Foods.status.suspected');
            case FoodStatusType.unknown:
                return i18n.t('Foods.status.unknown');
            default:
                return i18n.t('Foods.filters.allStatus');
        }
    };

    const renderItem = ({ item: food }: { item: Food }) => {
        if (food === null) return <View style={{ width: itemWidth }} />;

        return (
            <View
                style={{
                    width: itemWidth,
                    marginHorizontal: CARD_MARGIN,
                }}
                className='mt-2 items-center'
            >
                <FoodCard food={food} onPress={() => handlePress(food)} />
            </View>
        );
    };

    const renderEmptyList = () => {
        if (hasError) {
            return (
                <View className='flex-1 justify-center items-center'>
                    <Text className='text-grey-100 text-lg font-medium'>
                        {i18n.t('Foods.messages.error')}
                    </Text>
                </View>
            );
        }
        return (
            <View className='flex-1 justify-center items-center'>
                <Text className='text-grey-100 text-lg font-medium'>
                    {i18n.t('Foods.messages.noResults')}
                </Text>
            </View>
        );
    };

    const renderFooter = () => {
        if (loadingState !== 'more') return null;
        return (
            <View className='py-8 mb-4'>
                <ActivityIndicator size='small' />
            </View>
        );
    };

    const keyExtractor = (item: Food) => item.id;

    const getItemLayout = (_: any, index: number) => ({
        length: itemWidth + CARD_MARGIN * 2,
        offset: (itemWidth + CARD_MARGIN * 2) * Math.floor(index / numColumns),
        index,
    });

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
        }
        loadFoods(0, true);
    }, []);

    if (loadingState === 'initial') {
        return (
            <View className='flex-1 bg-blue-100 justify-center items-center'>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <View className='flex-1 bg-blue-100'>
            <SearchBar
                value={search}
                onChangeText={handleSearchChange}
                onSubmit={handleSearchSubmit}
                onClear={handleSearchClear}
                placeholder={i18n.t('Foods.search')}
            />

            <View className='flex-row justify-center mt-4'>
                <FilterButton
                    label={getSelectedCategoryName()}
                    onPress={() => setCategoryPickerVisible(true)}
                    onLayout={setCategoryButtonWidth}
                />
                <FilterButton
                    label={getSelectedStatusName()}
                    onPress={() => setStatusPickerVisible(true)}
                    onLayout={setStatusButtonWidth}
                />
            </View>

            <CategoryPickerModal
                visible={isCategoryPickerVisible}
                selectedCategory={selectedCategory}
                categories={categories}
                onClose={() => setCategoryPickerVisible(false)}
                onSelect={handleCategorySelect}
                buttonWidth={categoryButtonWidth}
                position='left'
            />

            <StatusPickerModal
                visible={isStatusPickerVisible}
                selectedStatus={selectedStatus}
                onClose={() => setStatusPickerVisible(false)}
                onSelect={handleStatusSelect}
                buttonWidth={statusButtonWidth}
                position='right'
            />

            <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={numColumns}
                className='flex-1'
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmptyList}
                getItemLayout={getItemLayout}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 80,
                    paddingHorizontal: CARD_MARGIN,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={15}
                windowSize={10}
                initialNumToRender={numColumns * 4}
            />
        </View>
    );
};

interface CategoryPickerModalProps {
    visible: boolean;
    selectedCategory: string;
    categories: Category[];
    onClose: () => void;
    onSelect: (value: string) => void;
    buttonWidth?: number;
    position?: 'left' | 'right';
}

const CategoryPickerModal = ({
    visible,
    selectedCategory,
    categories,
    onClose,
    onSelect,
    buttonWidth,
    position = 'left',
}: CategoryPickerModalProps) => {
    const items = [
        { label: i18n.t('Foods.filters.allCategories'), value: 'all' },
        ...categories.map(category => ({
            label: category.name,
            value: category.id,
        })),
    ];

    return (
        <PlatformPicker
            visible={visible}
            title={i18n.t('Foods.filters.categories')}
            selectedValue={selectedCategory}
            onClose={onClose}
            onSelect={onSelect}
            items={items}
            buttonWidth={buttonWidth}
            position={position}
        />
    );
};

interface StatusPickerModalProps {
    visible: boolean;
    selectedStatus: string;
    onClose: () => void;
    onSelect: (value: string) => void;
    buttonWidth?: number;
    position?: 'left' | 'right';
}

const StatusPickerModal = ({
    visible,
    selectedStatus,
    onClose,
    onSelect,
    buttonWidth,
    position = 'right',
}: StatusPickerModalProps) => {
    const items = [
        { label: i18n.t('Foods.filters.allStatus'), value: 'all' },
        {
            label: i18n.t('Foods.status.tolerated'),
            value: FoodStatusType.tolerated,
        },
        {
            label: i18n.t('Foods.status.not_tolerated'),
            value: FoodStatusType.not_tolerated,
        },
        {
            label: i18n.t('Foods.status.suspected'),
            value: FoodStatusType.suspected,
        },
        {
            label: i18n.t('Foods.status.unknown'),
            value: FoodStatusType.unknown,
        },
    ];

    return (
        <PlatformPicker
            visible={visible}
            title={i18n.t('Foods.filters.status')}
            selectedValue={selectedStatus}
            onClose={onClose}
            onSelect={onSelect}
            items={items}
            buttonWidth={buttonWidth}
            position={position}
        />
    );
};

export default FoodsScreen;
