import CommonMenu from './common/CommonMenu'

const updateProfile = "Update Profile"
const logout = "Logout"
const login = "Login"


const UserMenu = () => {
    return (
        <>
            <CommonMenu
                updateProfile={updateProfile}
                logout={logout}
                login={login}
            />
        </>
    )
}

export default UserMenu