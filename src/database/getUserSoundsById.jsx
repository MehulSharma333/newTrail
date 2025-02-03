import { collection, query, where, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase';

export const getUserSoundsById = async (userId, page = 0, limitPerPage = 40) => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Define query with pagination
        let lastVisible = null;
        if (page > 0) {
            const previousQuery = query(
                collection(db, 'SOUNDS'),
                where('author', '==', userId),
                where('is_deleted', '==', false),
                limit(page * limitPerPage)
            );
            const previousSnapshot = await getDocs(previousQuery);
            const docs = previousSnapshot.docs;
            if (docs.length > 0) {
                lastVisible = docs[docs.length - 1];
            }
        }

        const soundQuery = lastVisible
            ? query(
                collection(db, 'SOUNDS'),
                where('author', '==', userId),
                where('is_deleted', '==', false),
                startAfter(lastVisible),
                limit(limitPerPage)
            )
            : query(
                collection(db, 'SOUNDS'),
                where('author', '==', userId),
                where('is_deleted', '==', false),
                limit(limitPerPage)
            );

        const querySnapshot = await getDocs(soundQuery);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching user sounds:', error);
        throw new Error('Failed to fetch user sounds');
    }
};