import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import AddIcon from '@mui/icons-material/Add';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';

import { useRouter } from 'next/router';
import { eraseCookie } from '@/utils/cookies';

const actions = [
    { icon: <AddIcon />, name: 'Добавить', path: "add" },
    { icon: <KeyIcon />, name: 'Поменять пароль', path: "change" },
    { icon: <LogoutIcon />, name: 'Выход', path: "logout" },
];

export default function BasicSpeedDial({ del }) {
    const router = useRouter();
    const selectedPath = (path) => {
        if (path !== "logout") {
            return router.push(`/sys/${path}`)
        }
        eraseCookie("token")
        eraseCookie("user")
        del(false)
        return router.push(`/sys/admin`)
    }

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => selectedPath(action.path)}
                />
            ))}
        </SpeedDial>
    );
}
