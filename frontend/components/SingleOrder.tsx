import { Question } from "@/common.types";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios.config";
import {
  BsArrowLeftCircleFill,
  BsCheckSquareFill,
  BsCircleFill,
  BsImage,
  BsXCircleFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";

const SingleOrder = () => {
  const router = useRouter();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get("/user/get-single-order/" + id);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("no order found");
        return;
      }
    };
    fetchOrder()
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  const getDate = (date :string)=>{
    return new Date(date).toDateString()
  }

  return (
    <div className=" container mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Order Details</h1>
      </div>
      <div className="grid items-center mt-15 py-10 justify-center w-full grid-cols-2 gap-4">
        {order?.tran_ref && (
          <>
            <div className="font-bold">tran ref:</div>
            <div>{order?.tran_ref}</div>
          </>
        )}
        {order?.adminId && (
          <>
            <div className="font-bold">admin name:</div>
            <div>{order?.adminId.name}</div>
          </>
        )}
        {order?.userId && (
          <>
            <div className="font-bold">user name</div>
            <div>{order?.userId.name}</div>
          </>
        )}
        {order?.type && (
          <>
            <div className="font-bold">type</div>
            <div>{order?.type}</div>
          </>
        )}
        {order?.createdAt && (
          <>
            <div className="font-bold">createdAt</div>
            <div>{getDate(order?.createdAt)}</div>
          </>
        )}
         {order?.amount && (
          <>
            <div className="font-bold">amount</div>
            <div>{order?.amount}</div>
          </>
        )}
         {order?.status && (
          <>
            <div className="font-bold">status</div>
            <div>{order?.status}</div>
          </>
        )}
        {/* // TODO */}
        {/* <li>Membership: {order.name}</li> */}
        {/* calculate teh expiredtime left */}
        {/* <li>Membership expiretdime: {order.expiredtime} from now</li> */}
      </div>
    </div>
  );
};

export default SingleOrder;
