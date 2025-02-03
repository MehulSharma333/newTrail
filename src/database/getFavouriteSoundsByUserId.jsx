import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const getFavouriteSoundsByUserId = async (userId) => {
    try {
        const userRef = doc(db, 'USERS', userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return { success: false, message: 'User document does not exist' };
        }

        const favouriteSounds = userDoc.data().favourite_sounds || [];
        return { success: true, sounds: favouriteSounds };
    } catch (error) {
        console.error('Error fetching favorite sounds by user ID:', error);
        return { success: false, message: 'Error fetching favorite sounds' };
    }
};