import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";


const usePost = () => {
    const [axiosSecure] = useAxios();
    const { data: post_collection = [], refetch, isLoading } = useQuery({
        queryKey: ['post-collection'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all/post-collection');
            return res.data;
        },
    });

    return [post_collection, refetch, isLoading];
};

export default usePost;