import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function checkUserHasPerm(requiredPerms: string[], userPerms: string[]) {
    return userPerms.some((perm) => requiredPerms.indexOf(perm) !== -1);
}

interface User {
    user_permissions: string[],
    isAuthenticated: boolean
}

function UserPermissions(props: { permissions: any; showIfAuthenticated: any; children: any; }) {
    const { permissions, showIfAuthenticated, children } = props;

    const user = useSelector((state: {user: User}) => state.user);

    const userPermissions = user?.user_permissions || [];

    const userAllowed = permissions.length > 0
        ? checkUserHasPerm(permissions, userPermissions)
        : user.isAuthenticated;

    if (
        (showIfAuthenticated && userAllowed)
    || (!showIfAuthenticated && !userAllowed)
    ) {
        return children;
    }
    return null;
}

UserPermissions.defaultProps = {
    permissions: [],
    showIfAuthenticated: true,
};

UserPermissions.propTypes = {
    permissions: PropTypes.arrayOf(PropTypes.string),
    showIfAuthenticated: PropTypes.bool,
};

export default UserPermissions;
