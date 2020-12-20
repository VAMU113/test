import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

const login = (username, password) => {
    console.log("TUTAJ: " + username + password);
    return dispatch => {
        console.log("DISPATCH ", dispatch);
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    console.log("PRV ERROR LOGIN: error=", error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        console.log("ERROR LOGIN: error=", error);
        return {type: userConstants.LOGIN_FAILURE, error}
    }
};


const logout = () => {
    userService.logout();
    return {type: userConstants.LOGOUT};
};


const getAll = () => {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}

export const userActions = {
    login,
    logout,
    getAll
};
