import CommonMenu from "./common/CommonMenu"


const link = ["create", "blogs", "about"]


const HeaderMenu = () => {
    return (
        <>
            <CommonMenu 
                link={link}
            />
        </>
    )
}

export default HeaderMenu