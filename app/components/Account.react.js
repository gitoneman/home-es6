import React from "react";
import AccountStore from "../stores/AccountStore";
import AccountActions from "../actions/AccountActions";
import {Button,Modal} from "react-bootstrap";

class account extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = AccountStore.getState();
	    this.onChange = this.onChange.bind(this);
  	}
  	componentDidMount() {
	    AccountStore.listen(this.onChange);
	    //初始actions
	    //AccountActions.;
	    AccountActions.getList();
  	}
  	componentWillUnmount() {
	    AccountStore.unlisten(this.onChange);
  	}
  	onChange(state) {
	    this.setState(state);
  	}
  	render(){
  		var body = this.state.list.map(function(item){
			return (
				<tr dbid={item._id}>
					<td>{item.time}</td>
					<td>{item.name}</td>
					<td>{item.money}</td>
					<td>删除</td>
				</tr>
			)
		});
		return (
			<div className="g-cnt">
				<div className="account">
					<div className="account-search">
						<Button className="pull-right" bsStyle="primary">新增</Button>
					</div>
					<div className="account-body">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>创建时间</th>
									<th>名称</th>
									<th>金额</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								{body}
							</tbody>
						</table>
					</div>
				</div>
				<Modal show={false} onHide={this.close}>
					<Modal.Header>
		            	<Modal.Title>Modal heading</Modal.Title>
		          	</Modal.Header>
				</Modal>
			</div>
			
		);
  	}
}

export default account;