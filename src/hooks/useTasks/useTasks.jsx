import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";
import useAuth from "../useAuth/useAuth";


const useTasks = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const {data: allTasks = [], isPending: loading, refetch} = useQuery({
        queryKey: ['allTasks'],
        queryFn: async ()=>{
            const res = await axiosPublic.get(`/tasks?email=${user?.email}`);
            return res.data;
        }
    })
    return [allTasks, loading, refetch]
    }

export default useTasks;