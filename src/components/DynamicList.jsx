import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    IconButton, List, ListItem, makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    addItemBtnStyle: {
        marginLeft: '50%', // positions the "+" symbol in the middle of the <List />
    },
}));

/**
 * Wraps a list of values into a dynamic list where rows can be added and
 * deleted.
 *
 * @param props
 * @returns {JSX.Element}
 */
function DynamicList(props) {
    const {
        valueList,
        onChange,
        emptyChildCallback,
        idKey,
        Component,
        addItemBtnStyle,
        editable,
    } = props;
    const classes = useStyles();

    const addListItem = useCallback(() => {
        const extendedList = [...valueList, emptyChildCallback()];
        onChange(extendedList);
    }, [valueList, emptyChildCallback, onChange]);

    const handleItemChange = useCallback(
        (index, itemValue) => {
            const items = [...valueList];
            items[index] = itemValue;
            onChange(items);
        },
        [valueList, onChange],
    );

    const handleDeleteListItem = useCallback(
        (index) => {
            const items = [...valueList];
            items.splice(index, 1);
            onChange(items);
        },
        [valueList, onChange],
    );

    const listItems = valueList.map((itemValue, index) => (
        <ListItem key={itemValue[idKey]}>
            <Component
                value={itemValue}
                index={index}
                onChange={handleItemChange}
                onDelete={handleDeleteListItem}
                editable={editable}
            />
        </ListItem>
    ));

    return (
        <List>
            {listItems}
            {editable ? (
                <IconButton
                    className={addItemBtnStyle || classes.addItemBtnStyle}
                    onClick={addListItem}
                >
                    <AddIcon />
                </IconButton>
            ) : null}
        </List>
    );
}

DynamicList.propTypes = {
    addItemBtnStyle: PropTypes.objectOf(PropTypes.string),
    editable: PropTypes.bool,
};

DynamicList.defaultProps = {
    addItemBtnStyle: null,
    editable: true,
};

export default DynamicList;
