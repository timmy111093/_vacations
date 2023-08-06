import axios from "../axios";
import GraphData from "../models/GraphData";
import Vacation from "../models/Vacation";

export const followAsync = async (userId:number,vacationId:number) => {
      return await (await axios.post(`/vacations/follow/${userId}/${vacationId}`)).data;
}

export const unFollowAsync = async (userId:number,vacationId:number) => {
      await axios.delete(`/vacations/unfollow/${userId}/${vacationId}`);
}

export const getFollowingsUser = async (vacationId:number,userId:number) => {
      const followers = await axios.get(`/vacations/followersByVacation/${vacationId}/${userId}`);
      return followers.data;
}

// get the number of followers by vacation id
export const getFollowersByVacationAsync = async (vacationId:number) => {
      const followersCount = await axios.get(`/vacations/followersByVacation/${vacationId}`);
      return followersCount.data;
}

// get array with destination and number of followers
export const getGraphData = async ():Promise<GraphData[]> => {
      const graphData = await axios.get<GraphData[]>(`/vacations/statistics`);
      return graphData.data;
}

// get only the vacations this user following
export const getFavoritesAsync = async (userId:number) => {
      const favorites = await axios.get<Vacation[]>(`/vacations/favorites/${userId}`);
      return favorites.data;
}
