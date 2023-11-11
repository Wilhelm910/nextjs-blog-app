"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAuthContext } from '@/app/utils/AuthContextProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';


type Props = {
    link?: string[];
    updateProfile?: string;
    logout?: string;
    login?: string
}

const CommonMenu = (props: Props) => {

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null)

        })
    }

    const { user, setUser } = useAuthContext()

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <Button color="secondary" variant="contained" {...bindTrigger(popupState)}>
                        {props.link ? ("Menu") : (user ? `${user.displayName}` : "Account settings")}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        {props?.link?.map((item, index) =>
                        (
                            < MenuItem key={index} onClick={popupState.close} component="a" href={`/${item}`} >
                                <ListItemIcon>
                                    {item === "create" ? (<EditIcon style={{ color: "#612316" }} />) : ""}
                                    {item === "blogs" ? (<BookIcon style={{ color: "#612316" }} />) : ""}
                                    {item === "about" ? (<InfoIcon style={{ color: "#612316" }} />) : ""}
                                </ListItemIcon>
                                <ListItemText >
                                    <Typography color='secondary'>{`${item.charAt(0).toUpperCase()}` + `${item.slice(1, item.length)}`}</Typography>
                                </ListItemText>
                            </MenuItem >
                        ))}
                        {props.updateProfile && (
                            <MenuItem onClick={popupState.close}>
                                <ListItemIcon>
                                    <ManageAccountsIcon style={{ color: "#612316" }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography color='secondary'>{props.updateProfile}</Typography>
                                </ListItemText>
                            </MenuItem>
                        )}
                        {user?.uid ? (
                            props.logout && (
                                <MenuItem onClick={popupState.close}>
                                    <ListItemIcon>
                                        <LogoutIcon style={{ color: "#612316" }} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography onClick={handleLogout} component="a" color='secondary'>{props.logout}</Typography>
                                    </ListItemText>
                                </MenuItem>
                            )
                        ) : (
                            props.login && (
                                <MenuItem onClick={popupState.close}>
                                    <ListItemIcon>
                                        <LogoutIcon style={{ color: "#612316" }} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography sx={{ textDecoration: "none" }} component="a" href='/auth' color='secondary'>{props.login}</Typography>
                                    </ListItemText>
                                </MenuItem>
                            )
                        )}

                    </Menu>
                </>
            )}
        </PopupState>
    )
}

export default CommonMenu