
import type { UserProfile } from "../interfaces/IuserProfile.interface";
export interface UserProfileRepository {
  getUserProfileById(id: string): Promise<UserProfile>;
  createUserProfile(userProfile: UserProfile): Promise<UserProfile>;
  updateUserProfile(userProfile: UserProfile): Promise<UserProfile>;
  deleteUserProfile(id: string): Promise<void>;
}
