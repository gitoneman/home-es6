import alt from "../alt";

class AccountActions{
    constructor() {
        this.generateActions(
            'getListSuccess',
            'getFail'
        );
    }
    getList(){
        $.ajax({type:"get",url:"/account"})
        .done(data => {
            this.actions.getListSuccess(data);
        })
    }
}
export default alt.createActions(AccountActions);