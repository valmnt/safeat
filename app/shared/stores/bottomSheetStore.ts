import { create } from 'zustand';
import { type RefObject } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

interface BottomSheetState {
    bottomSheetRef: RefObject<BottomSheet> | null;
    setBottomSheet: (ref: RefObject<BottomSheet>) => void;
    openBottomSheet: () => void;
    closeBottomSheet: () => void;
}

const useBottomSheetStore = create<BottomSheetState>(set => ({
    bottomSheetRef: null,
    setBottomSheet: ref => set({ bottomSheetRef: ref }),
    openBottomSheet: () => {
        set(state => {
            state.bottomSheetRef?.current?.snapToIndex(0);
            return state;
        });
    },
    closeBottomSheet: () => {
        set(state => {
            state.bottomSheetRef?.current?.close();
            return state;
        });
    },
}));

export default useBottomSheetStore;
