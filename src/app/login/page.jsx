'use client'
import LoginPage from "@/components/pages/LoginPage";

const UserLogin = ({searchParams}) => {

    const { upload } = searchParams;
    
    return (
        <LoginPage uploadCheck={upload} />
    );
};

export default UserLogin;
