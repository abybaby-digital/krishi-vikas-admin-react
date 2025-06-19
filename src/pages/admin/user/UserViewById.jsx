import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { useForm, Controller } from "react-hook-form";
import { TiWarning } from "react-icons/ti";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addComboPlan, fetchBannerFeatureList, fetchBoostFeatureList, fetchCategoryList, fetchPromotionTagList, fetchStateList, fetchUserById } from "../../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { TbCoinRupee, TbUserHexagon } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa6";
import { LocateIcon, LocateOffIcon, Pin } from "lucide-react";
import { BiLocationPlus } from "react-icons/bi";

export default function UserViewById() {

    const token = useSelector((state) => state.auth.token);
    const { id } = useParams();




    // USER VIEW BY ID

    const {
        data: userDetails,
        isLoading: userDetailsLoading,
    } = useQuery({
        queryKey: ["user-details", id],
        queryFn: () => fetchUserById(token, +id),
    });

    // console.log(userDetails.response.user_profile);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHeader head_text="User Details" />
                <div className="user-details-dealer bg-white p-5 max-h-[90vh] overflow-auto">
                    <div className="user-info shadow rounded-xl p-2">
                        <h2 className="text-center text-2xl font-dmsans bg-whitesmoke rounded-xl p-3">User Profile</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="user-profile px-10 py-5 shadow rounded-xl my-4">
                                <ul className="list-disc">
                                    <li><span className="font-semibold">User Id : </span> {userDetails?.response.user_profile.id}</li>
                                    <li><span className="font-semibold">User Type : </span> {userDetails?.response.user_profile.user_type_name}</li>
                                    <li><span className="font-semibold">Name : </span> {userDetails?.response.user_profile.name}</li>
                                    {
                                        userDetails?.response.user_profile.company_name &&
                                        <li><span className="font-semibold">Company : </span> {userDetails?.response.user_profile.company_name}</li>
                                    }
                                    <li><span className="font-semibold">Address : </span> {userDetails?.response.user_profile.area}</li>
                                    <li><span className="font-semibold">City Name : </span> {userDetails?.response.user_profile.city_name}</li>
                                    <li><span className="font-semibold">District Name : </span> {userDetails?.response.user_profile.district_name}</li>
                                    <li><span className="font-semibold">District Name : </span> {userDetails?.response.user_profile.state_name}</li>
                                    <li><span className="font-semibold">Pincode : </span> {userDetails?.response.user_profile.zipcode}</li>
                                    <li><span className="font-semibold">Language : </span> {userDetails?.response.user_profile.language_name}</li>
                                </ul>
                            </div>
                            <div className="user-image px-10 py-5 shadow rounded-xl my-4 flex justify-center items-center">
                                {
                                    userDetails?.response.user_profile.profile_img === null || userDetails?.response.user_profile.profile_img === "" ?
                                        <div className="text-center">
                                            <TbUserHexagon className="text-8xl inline-block" />
                                            <p>No Image</p>
                                        </div>
                                        :
                                        <img src={userDetails?.response.user_profile.profile_img} alt="profile_image" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="user-info shadow rounded-xl p-2 my-3">
                        <h2 className="text-center text-2xl font-dmsans bg-whitesmoke rounded-xl p-3">User Post</h2>
                        <div className="px-3 py-5">
                            {
                                (
                                    userDetails?.response?.user_post?.tractor?.length === 0 &&
                                    userDetails?.response?.user_post?.goodsvehicle?.length === 0 &&
                                    userDetails?.response?.user_post?.harvester?.length === 0 &&
                                    userDetails?.response?.user_post?.implement?.length === 0 &&
                                    userDetails?.response?.user_post?.seed?.length === 0 &&
                                    userDetails?.response?.user_post?.tyre?.length === 0 &&
                                    userDetails?.response?.user_post?.pesticides?.length === 0 &&
                                    userDetails?.response?.user_post?.fertilizers?.length === 0
                                ) ? (
                                    <div className="col-span-2 text-center text-gray-500 text-sm my-5">
                                        No Post Found
                                    </div>
                                )
                                    :
                                    (
                                        <div className="post-container">

                                            <Accordion
                                                type="single"
                                                collapsible
                                                className="w-full"
                                                defaultValue="item-1"
                                            >
                                                {
                                                    userDetails?.response?.user_post?.tractor?.length !== 0 &&
                                                    <AccordionItem value="item-1" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Tractor</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.tractor.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.front_image} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }
                                                {
                                                    userDetails?.response?.user_post?.goodsvehicle?.length !== 0 &&
                                                    <AccordionItem value="item-2" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Goods Vehicle</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.goodsvehicle.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.front_image} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }
                                                {
                                                    userDetails?.response?.user_post?.harvester?.length !== 0 &&
                                                    <AccordionItem value="item-3" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Harvester</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.harvester.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.front_image} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }
                                                {
                                                    userDetails?.response?.user_post?.implement?.length !== 0 &&
                                                    <AccordionItem value="item-4" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Implements</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.implement.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.front_image} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }

                                                {
                                                    userDetails?.response?.user_post?.tyre?.length !== 0 &&
                                                    <AccordionItem value="item-5" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Tyre</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.tyre.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.image1} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }
                                                {
                                                    userDetails?.response?.user_post?.seed?.length !== 0 &&
                                                    <AccordionItem value="item-6" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Seeds</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.seed.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.image1} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }
                                                {
                                                    userDetails?.response?.user_post?.pesticides?.length !== 0 &&
                                                    <AccordionItem value="item-7" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Pesticides</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.pesticides.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.image1} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }
                                                {
                                                    userDetails?.response?.user_post?.fertilizers?.length !== 0 &&
                                                    <AccordionItem value="item-8" className="my-3 border-none">
                                                        <AccordionTrigger className="bg-whitesmoke rounded-xl px-5 text-xl hover:no-underline font-dmsans">Fertilizers</AccordionTrigger>
                                                        <AccordionContent className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 p-5">
                                                            {
                                                                userDetails?.response?.user_post?.fertilizers.map((item) => (
                                                                    <div className="product-card border border-dashed rounded-xl p-1 shadow" key={item.id}>
                                                                        <img src={item.image1} alt="image" className="h-[150px] block object-cover w-full rounded-xl" />
                                                                        <div className="description text-center">
                                                                            <p className="bg-whitesmoke mt-2 text-center p-2">{item.title}</p>
                                                                            <p className="text-center p-2 inline-flex items-center mx-auto"><TbCoinRupee /> {item.price}{item.rent_type ? item.rent_type : null}</p>
                                                                        </div>
                                                                        {/* <p><BiLocationPlus />{item.district_name}</p> */}
                                                                    </div>
                                                                ))
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                }


                                            </Accordion>


                                        </div>
                                    )
                            }
                        </div>
                    </div>

                    <div className="user-subscription shadow rounded-xl p-2 my-3">
                        <h2 className="text-center text-2xl font-dmsans bg-whitesmoke rounded-xl p-3">User Subscription</h2>
                        <div className="px-3 py-5">
                            {
                                <div className="post-container overflow-x-auto">

                                    <table border="1" cellpadding="8" cellspacing="0">
                                        <thead className="bg-whitesmoke">
                                            <tr>
                                                <th>ID</th>
                                                <th>User ID</th>
                                                <th>Plan ID</th>
                                                <th>Plan Start Date</th>
                                                <th>Plan End Date</th>
                                                <th>Plan Name</th>
                                                <th>Duration</th>
                                                <th>Price</th>
                                        
                                                <th>No. of Boosts</th>
                                                <th>No. of Products</th>
                                                <th>Package Description</th>
                                                <th>Min Lead</th>
                                                <th>Max Lead</th>
                                                <th>Invoice Type</th>
                                                <th>Invoice No.</th>
                                                <th>Paid Amount</th>
                                                <th>Net Amount</th>
                                                <th>Discount Amount</th>
                                                <th>Discount %</th>
                                                <th>Tax Category</th>
                                                <th>Mode of Transaction</th>
                                                <th>Transaction Type</th>
                                                <th>Invoice File</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userDetails?.response?.user_subscription?.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.user_id}</td>
                                                        <td>{item.plan_id}</td>
                                                        <td>{item.plan_start_date}</td>
                                                        <td>{item.plan_end_date}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.duration} {item.duration_type}</td>
                                                        <td> {item.price}</td>
                                                        <td>{item.no_of_boost}</td>
                                                        <td>{item.no_of_product}</td>
                                                        <td>{item.package_description}</td>
                                                        <td>{item.min_lead}</td>
                                                        <td>{item.max_lead}</td>
                                                        <td>{item.invoice_type}</td>
                                                        <td>{item.invoice_no}</td>
                                                        <td> {item.paid_amount}</td>
                                                        <td> {item.net_amount}</td>
                                                        <td> {item.discount_amount}</td>
                                                        <td>{item.discount_percentage} %</td>
                                                        <td>{item.tax_category}</td>
                                                        <td>{item.mode_of_transaction}</td>
                                                        <td>{item.transaction_type}</td>

                                                        {
                                                            item.invoice_file_path ?
                                                                (
                                                                    <td className="text-center">
                                                                        <a href={item.invoice_file_path} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Invoice</a>
                                                                    </td>
                                                                ) :
                                                                (
                                                                    <div className="text-center text-red-500">No Invoice</div>
                                                                )
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>



                                </div>

                            }
                        </div>
                    </div>

                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
