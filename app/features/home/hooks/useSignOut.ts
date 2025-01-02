import supabase from '@/app/config/supabase';
import { useCallback } from 'react';

const useSignOut = () => {
    return useCallback(async (didFinish: () => void) => {
        await supabase.auth.signOut();
        didFinish();
    }, []);
};

export default useSignOut;
