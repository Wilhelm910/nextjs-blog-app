import CommonMenu from './common/CommonMenu'

const updateProfile = "Update Profile"
const logout = "Logout"

const UserMenu = () => {
    return (
        <>
            <CommonMenu
                updateProfile={updateProfile}
                logout={logout}
            />
        </>
    )
}

export default UserMenu