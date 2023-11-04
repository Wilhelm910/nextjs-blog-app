"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';


const HeaderMenu = () => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <Button color="secondary" variant="contained" {...bindTrigger(popupState)}>
                        Menu
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close} component="a">
                            <ListItemIcon>
                                <EditIcon style={{ color: "#612316" }}/>
                            </ListItemIcon>
                            <ListItemText >
                                <Link color='secondary' href="/create">Create</Link>
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={popupState.close} component="a">
                            <ListItemIcon>
                                <BookIcon style={{ color: "#612316" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <Link color='secondary' href="/blogs">Blogs</Link>
                            </ListItemText></MenuItem>
                        <MenuItem onClick={popupState.close} component="a">
                            <ListItemIcon>
                                <InfoIcon style={{ color: "#612316" }}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Link color='secondary' href="/about">About</Link>
                            </ListItemText></MenuItem>
                    </Menu>
                </>
            )}
        </PopupState>
    )
}

export default HeaderMenu