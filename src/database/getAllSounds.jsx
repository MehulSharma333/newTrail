import { collection, query, where, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase';
import { allCategories } from './allCategories'; // Cached categories

export const getAllSounds = async (page = 0, limitPerPage = 50) => {
    try {
        // Fetch cached category names
        const cachedCategories = await allCategories();
        const catList = cachedCategories.reduce((acc, category) => {
            acc[category.value] = category.label;
            return acc;
        }, {});

        // Fetch sounds with pagination
        let lastVisible = null;
        if (page > 0) {
            const previousQuery = query(
                collection(db, 'SOUNDS'),
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
                where('is_deleted', '==', false),
                startAfter(lastVisible),
                limit(limitPerPage)
            )
            : query(
                collection(db, 'SOUNDS'),
                where('is_deleted', '==', false),
                limit(limitPerPage)
            );

        const querySnapshot = await getDocs(soundQuery);

        const sounds = querySnapshot.docs.map(doc => ({
            id: doc.id,
            cat: (doc.data().category || []).map(catId => catList[catId] || catId),
            ...doc.data(),
        }));

        return sounds;
    } catch (error) {
        console.error('Error fetching sounds:', error);
        throw new Error('Failed to fetch sounds');
    }
};