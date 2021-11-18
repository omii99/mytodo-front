import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess,
} from "../actions/Auth";


import Amplify, { Auth } from 'aws-amplify';
import {setSession, setUserSession} from "../../session/Session";

Amplify.configure({
    Auth: {
        region: 'us-east-2',
        userPoolId: 'us-east-2_FMJpUHgXq',
        userPoolWebClientId: '1ama9illjf6h5tsd4b4ahl4snc',
        mandatorySignIn: true,
        authenticationFlowType: 'USER_PASSWORD_AUTH',
        clientMetadata: { myCustomKey: 'myCustomValue' },
        oauth: {
            domain: 'your_cognito_domain',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code'
        },
    }
});

// You can get the current config object
const currentConfig = Auth.configure();


export function* login() {
    yield takeEvery(SIGNIN, function* ({payload}) {
        const {username, password} = payload;
        try {
            const res = yield call([Auth,Auth.signIn],username, password);
            setSession(res.signInUserSession.accessToken.jwtToken);
            setUserSession(res.signInUserSession);
            yield put(authenticated(res.signInUserSession.accessToken.jwtToken));
        } catch (err) {
            console.log('->>>>>>>>>>');
            console.log(err);
            yield put(showAuthMessage(err.message));
        }
    });
}

export function* logout() {
  yield takeEvery(SIGNOUT, function* () {
      console.log('->>>>>>>>>>');
		// try {
        //     yield put(signOutSuccess());
		// } catch (err) {
		// 	yield put(showAuthMessage(err));
		// }
	});
}


export default function* rootSaga() {
  yield all([
		fork(login),
		fork(logout)
  ]);
}
