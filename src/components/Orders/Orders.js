import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../UI/Spinner/Spinner';

const orders = props => {
	const { onFetchOrders } = props;

	useEffect(() => {
		onFetchOrders(props.token, props.userId);
	}, [onFetchOrders]);

	let orders = <Spinner/>;
	if (!props.loading) {
		orders = props.orders.map(order => (
			<Order
				key={order.id}
				ingredients={order.ingredients}
				price={+order.price}/>
		));
	}

	return (
		<div>
			{orders}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
