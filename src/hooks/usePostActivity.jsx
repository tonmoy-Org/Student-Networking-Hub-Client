import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";


const usePostActivity = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxios();
    
    const { data: PostActivity = [], refetch, isLoading } = useQuery({
        queryKey: ['postCollection/personal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/postCollection/personal/${user?.email}`);
            return res.data;
        },
    });

    return [PostActivity, refetch, isLoading];
};

export default usePostActivity;