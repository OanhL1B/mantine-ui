import { cartStore } from "@/local-store/LocalStore";
import { IProduct } from "@/models/product";
import { FC, ReactNode, createContext, useContext, useReducer } from "react";

type CartContextType = {
  cartItems: IProduct[];
  addProduct: (v: IProduct) => void;
  decrease: (item: IProduct) => void;
  updateQuantity: (item: IProduct) => void;
};

interface IState {
  cartItems: IProduct[];
}

enum ACTION {
  ADD = "ADD_TO_CART",
  DECREASE = "DECREASE_QUANTITY",
  UPDATE = "UPDATE_QUANTITY",
}

interface IAction {
  type: ACTION;
  payload: IProduct;
}

interface IProp {
  children: ReactNode;
}

const savedCartItems = cartStore.getCartStore();

const initialState: IState = {
  cartItems: savedCartItems ? savedCartItems : [],
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

const cartReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTION.ADD:
      const existingProduct = state.cartItems?.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        cartStore.setCartStore(state.cartItems);
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ];
        cartStore.setCartStore(state.cartItems);
      }
      return { ...state };

    case ACTION.DECREASE:
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      cartStore.setCartStore(state.cartItems);
      return { ...state };

      
    case ACTION.UPDATE:
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[index] = action.payload;
      cartStore.setCartStore(state.cartItems);


      return {...state, cartItems: [...state.cartItems]}
    default:
      return state;
  }
};

export const CartProvider: FC<IProp> = ({ children }: IProp) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product: IProduct) => {
    dispatch({ payload: product, type: ACTION.ADD });
  };
  const decrease = (product: IProduct) => {
    dispatch({ payload: product, type: ACTION.DECREASE });
  };
  const updateQuantity = (product: IProduct) => {
    dispatch({ payload: product, type: ACTION.UPDATE });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems || [],
        addProduct,
        decrease,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
