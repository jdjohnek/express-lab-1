import cartItem from "./cart-item";

class AddItem implements cartItem {

    constructor(
        public id: number,
        public product: string,
        public price: number,
        public quantity: number,
    ) {}

}

export default AddItem;