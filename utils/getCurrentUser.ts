import { User } from "../model/user";


export const getCurrentUser = async (email: string) => {
    try {
        if (!email) return null;
        const user = await User.findOne({ email });
        if (!user) return null;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}