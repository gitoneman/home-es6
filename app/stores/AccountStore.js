import alt from "../alt";
import AccountActions from "../actions/AccountActions";

class AccountStore {
    constructor() {
        this.bindActions(AccountActions);
        this.list = [];
        //write state
    }

    onGetListSuccess(data){
        this.list = data;
    }
    onGetSuccess(data) {
        this.movies = data;
    }

    onGetFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(AccountStore);