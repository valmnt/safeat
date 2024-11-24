import supabase from '@/app/config/supabase';
import { useCallback } from 'react';

const useSignOut = (): ((didFinish: () => void) => Promise<void>) => {
    const signOut = useCallback(async (didFinish: () => void) => {
        await supabase.auth.signOut();
        didFinish();
    }, []);

    return signOut;
};

export default useSignOut;
