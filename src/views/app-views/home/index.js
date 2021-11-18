import React, {useEffect} from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import {getUserPermissionSuccess} from "./redux/actions/userPermissionAction";

const Home = (props) => {
    // const {getUserPermissionSuccess,userPermission,loading} = props;
	// useEffect(()=>{
	// 	getUserPermissionSuccess("000000");
	// 	localStorage.setItem("UserPermissiom",userPermission);
	// },[])
	return (
		<div>
			Home component works!
		</div>
	)
}

Home.prototype = {
	// userPermission: PropTypes.object.isRequired,
	// getUserPermissionSuccess:PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
	console.log(state)
	return {
		// userPermission: state.userPermission.userPermission,
		// loading:state.userPermission.loading,
	}
};

export default connect(mapStateToProps)(Home);
