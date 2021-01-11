import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuRouter from './model/MenuRouter';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    title: {
        color: 'black',
    },
    menuIcon: {
        color: 'gray',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, left: open });
    };

    const showDrawerList = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {MenuRouter.map((item) => (
                    <ListItem button key={item.title}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {item.subTitle === 'tutorial'
                            ? <Link to="tutorial" className={classes.title}>{item.title}</Link>
                            : <a href={item.path} className={classes.title}>{item.title}</a>}
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon className={classes.menuIcon} />
            </Button>
            <Drawer open={state.left} onClose={toggleDrawer(false)}>
                {showDrawerList()}
            </Drawer>
        </div>
    );
}
