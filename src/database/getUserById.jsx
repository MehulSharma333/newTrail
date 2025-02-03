import { getLoggedInUser } from "./getLoggedInUser";
export const getUserById = async (userId) => {
  try {
      const loggedInUser = await getLoggedInUser();
      // If the requested user is the logged-in user, return cached data
      if (loggedInUser.id === userId) {
          return loggedInUser;
      }

      // Otherwise, fetch the user data from Firestore
      const userRef = doc(db, 'USERS', userId);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
          throw new Error('User not found');
      }

      const userData = { id: userSnapshot.id, ...userSnapshot.data() };
      return userData;
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user');
  }
};
