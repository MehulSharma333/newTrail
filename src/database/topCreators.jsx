import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust your Firebase import path

export const topCreators = async () => {
    try {
        // Query top 20 creators by downloads
        const usersQuery = query(
            collection(db, 'USERS'),
            where('is_banned', '==', false),
            where('is_active', '==', true),
            where('name', '!=', null),
            orderBy('downloads', 'desc'),
            limit(20)
        );

        const usersSnapshot = await getDocs(usersQuery);

        // Map the result to an array of user objects
        const topCreators = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return topCreators;
    } catch (error) {
        console.error('Error fetching top creators:', error);
        throw error;
    }
};