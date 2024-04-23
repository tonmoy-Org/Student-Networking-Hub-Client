import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useProfile = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxios();

    const { data: profile, isLoading: isProfileLoading, refetch } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/${user?.email}`);
                return res.data;
            } catch (error) {
                console.error('Error while fetching profile:', error);
                throw new Error(error);
            }
        },
        enabled: !loading && !!user,
    });
    
    if (loading || !user) {
        return [null, true];
    }

    return [profile, isProfileLoading, refetch];
};

export default useProfile;
