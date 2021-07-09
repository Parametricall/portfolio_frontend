import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function checkUserHasPerm(requiredPerms, userPerms) {
    return userPerms.some((perm) => requiredPerms.indexOf(perm) !== -1);
}

function UserPermissions(props) {
    const { permissions, showIfAuthenticated, children } = props;

    const user = useSelector((state) => state.user);

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
