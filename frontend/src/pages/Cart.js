import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayBDCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmCheckout, setShowConfirmCheckout] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    billingAddress: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    } else if (!responseData.success && responseData?.data) {
      toast.warning(responseData?.message);
      fetchData();
      context.fetchUserAddToCart();
    } else {
      toast.error(responseData?.message);
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const fetchDeliveryCharge = async () => {
    const fetchData = await fetch(SummaryApi.getDeliveryFee.url, {
      method: SummaryApi.getDeliveryFee.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setDeliveryFee(dataResponse.data.deliveryFee);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const subTotal = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const validateForm = () => {
    const { billingAddress, mobile, name } = formData;

    if (!mobile || !name || !billingAddress) return false;
    return true;
  }

  useEffect(() => {
    if (user?.billingInfo) {
      setFormData({
        name: user?.billingInfo.name || '',
        mobile: user?.billingInfo.mobile || '',
        billingAddress: user?.billingInfo.billingAddress || "",
        email: user?.billingInfo.email || ""
      })
    }
  }, [user])

  useEffect(() => {
    fetchDeliveryCharge();
  }, [])

  useEffect(() => {
    if (subTotal && deliveryFee) {
      setTotalPrice(subTotal + deliveryFee);
    }
  }, [subTotal, deliveryFee])

  const handlePayment = () => {

    if (!validateForm()) return;

    const cartDataWithTotalPrice = {
      products: data,
      billingInfo: formData,
      deliveryFee,
      totalPrice,
      user
    };

    fetch("http://localhost:8080/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartDataWithTotalPrice)
    }).then(res => res.json())
      .then(result => {
        if (!result?.success) {
          toast.warning(result?.message);
          fetchData();
          context.fetchUserAddToCart();
          throw new Error(`Something wen't wrong`);
        }
        window.location.replace(result.url)
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
              return (
                <div
                  key={el + "Add To Cart Loading" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              );
            })
            : data.map((product, index) => {
              return (
                <div
                  key={product?._id + "Add To Cart Loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    {/**delete product */}
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayBDCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayBDCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        onClick={() =>
                          decraseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : data.length >= 1 &&
          (
            <div className="h-36 bg-white">
              <div className="bg-white px-2">
                <div className="text-lg text-center font-bold mt-2">
                  Billing Information
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billingAddress">
                    Billing Address
                  </label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Subtotal</p>
                  <p>{displayBDCurrency(subTotal)}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Shipping Charge</p>
                  <p>{displayBDCurrency(deliveryFee)}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total</p>
                  <p>{displayBDCurrency(totalPrice)}</p>
                </div>

                <button id="submit" className="bg-blue-600 p-2 text-white w-full mt-2" onClick={handlePayment}>
                  Payment
                </button>
              </div>

            </div>
          )
          }
        </div>
      </div>

    </div>
  );
};

export default Cart;
