export default{
    totalCount (state) {
        return state.cartFoods.reduce((preTotal,food) => preTotal + food.count,0);
    },

    totalPrice (state) {
        return state.cartFoods.reduce((preTotal,food) => preTotal + food.price * food.count,0);
    },
    positiveSize(state) {
        return state.ratings.reduce((preTotal,rating) => {
            if(rating.rateType === 0){
                return preTotal + 1;
            }else{
                return preTotal;
            }
        },0);
    }
};