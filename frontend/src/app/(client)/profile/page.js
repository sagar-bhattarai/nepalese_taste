"use client";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import userDummy from "../../../../public/user_placeholder.png";
import { getUserById, updateUser } from "@/apis/user.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TbUserEdit } from "react-icons/tb";
import { FaSpinner } from 'react-icons/fa';
import { IoReturnUpBackOutline } from "react-icons/io5";


const profilePage = () => {
  const [profile, setProfile] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => (state.auth?.user?.userData))
  const { register, handleSubmit, reset } = useForm();

  // console.log(profile)

  useEffect(() => {
    if (profile) {
      reset({
        userName: profile?.userName,
        userEmail: profile?.userEmail,
        bio: profile?.bio,
        userAddress: profile?.userAddress,
        userPhone: profile?.userPhone,
        gender: profile?.gender,
      });

      // Set existing image into state
      if (profile?.profileImage) {
        setSelectedImage({
          preview: profile?.profileImage, // cloudinary or backend URL
          file: profile?.profileImage,
          isExisting: true,
        });
      }
    }
  }, [profile, reset]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; //  take first file
    if (file) {
      setSelectedImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const getProfile = async (id) => {
    const response = await getUserById(id);
    setProfile(response.result)
  }
  useEffect(() => {
    getProfile(user._id)
  }, [])

  const handleUpdateProfile = (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("userName", data?.userName);
    formData.append("userEmail", data?.userEmail);
    formData.append("bio", data?.bio);
    formData.append("userAddress", data?.userAddress);
    formData.append("gender", data?.gender);
    formData.append("profileImage", selectedImage?.file);

    updateUser(user._id, formData)
      .then((res) => {
        toast.success("profile updated successfully");
        // router.back();
      })
      .catch((error) => {
        toast.error("could not update profile");
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      {
        editProfile
          ?
          <form onSubmit={handleSubmit(handleUpdateProfile)} className="p-4">
            <h1 className="mb-8 text-2xl font-medium dark:text-gray-500 flex gap-2 items-center">
              <button 
                className="cursor-pointer"
                onClick={() => setEditProfile(false)}>
                <IoReturnUpBackOutline className="hover:text-primary"/>
              </button>
              Edit Information
            </h1>
            <div className="w-30 relative border rounded-full p-2 border-slate-600">
              <Image
                src={selectedImage?.preview || profile?.profileImage || userDummy}
                alt={`${profile?.userName}'s profile image`}
                height={120}
                width={120}
                className="rounded-full"
              />
              <div
                {...getRootProps()}
                htmlFor="dropzone-file"
                className="absolute right-0 bottom-0 cursor-pointer bg-primary rounded-full p-1 hover:bg-purple-900"
              >
                <TbUserEdit className="text-white" />
                <input
                  {...getInputProps({
                    accept: ".png,.jpg,.jpeg",
                  })}
                />
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 rounded-md my-2">
              <div className="left min-w-3/6">
                <div className="mb-2 flex flex-col">
                  <label className="dark:text-gray-400" >Name</label>
                  <input
                    type="text"
                    id="userName"
                    {...register("userName")}
                    className="mt-1 text-gray-600 border border-slate-600 rounded-md p-1" />
                </div>
                <div className="mb-2 flex flex-col">
                  <label className="dark:text-gray-400 ">Email</label>
                  <input
                    type="text"
                    id="userEmail"
                    {...register("userEmail")}
                    className="mt-1 text-gray-600 border border-slate-600 rounded-md p-1" />
                </div>
                <div className="mb-2 flex flex-col">
                  <label className="dark:text-gray-400 ">Phone</label>
                  <input
                    type="text"
                    id="userPhone"
                    {...register("userPhone")}
                    className="mt-1 text-gray-600 border border-slate-600 rounded-md p-1" />
                </div>
              </div>
              <div className="right min-w-3/6">
                <div className="mb-2 flex flex-col">
                  <label className="dark:text-gray-400 ">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    {...register("gender")}
                    className="mt-1 text-gray-600 border border-slate-600 rounded-md p-1" />
                </div>
                <div className="mb-2 flex flex-col">
                  <label className="dark:text-gray-400 ">Bio</label>
                  <input
                    type="text"
                    id="bio"
                    {...register("bio")}
                    className="mt-1 text-gray-600 border border-slate-600 rounded-md p-1" />
                </div>
                <div className="mb-2 flex flex-col">
                  <label className="dark:text-gray-400 ">Address</label>
                  <input
                    type="text"
                    id="userAddress"
                    {...register("userAddress")}
                    className="mt-1 text-gray-600 border border-slate-600 rounded-md p-1" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                // onClick={handleUpdateProfile}
                className="py-2 px-4 text-sm dark:text-gray-400 hover:text-primary border cursor-pointer r rounded-md border-purple-500 hover:border-primary">
                update Profile
              </button>
              {loading && <FaSpinner className='animate-spin' />}
            </div>
          </form>

          :

          <div className="p-4">
            <h1 className="mb-8 text-2xl font-medium dark:text-gray-500 ">General Information</h1>
            <div className="h-30 w-30 border rounded-full p-2 border-slate-600">
              <Image
                src={selectedImage?.preview || profile?.profileImage || userDummy}
                alt={`${profile?.userName}'s profile image`}
                height={120}
                width={120}
                className="rounded-full"
              />
            </div>
            <div className="flex justify-between items-center gap-2 rounded-md p-4 my-2">
              <div className="left min-w-3/6">
                <div className="mb-2">
                  <label className="dark:text-gray-400" >Name</label>
                  <div className="ml-2 text-gray-600">{profile?.userName}</div>
                </div>
                <div className="mb-2">
                  <label className="dark:text-gray-400 ">Email</label>
                  <div className="ml-2 text-gray-600">{profile?.userEmail}</div>
                </div>
                <div className="mb-2">
                  <label className="dark:text-gray-400 ">Phone</label>
                  <div className="ml-2 text-gray-600">{profile?.userPhone || "N/A"}</div>
                </div>
              </div>
              <div className="right min-w-3/6">
                <div className="mb-2">
                  <label className="dark:text-gray-400 ">Gender</label>
                  <div className="ml-2 text-gray-600">{profile?.gender || "N/A"}</div>
                </div>
                <div className="mb-2">
                  <label className="dark:text-gray-400 ">Bio</label>
                  <div className="ml-2 text-gray-600">{profile?.bio || "N/A"}</div>
                </div>
                <div className="mb-2">
                  <label className="dark:text-gray-400 ">Address</label>
                  <div className="ml-2 text-gray-600">{profile?.userAddress}</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setEditProfile(true)}
              className="py-2 px-4 text-sm dark:text-gray-400 hover:text-primary border cursor-pointer rounded-md border-purple-500 hover:border-primary">
              Edit Profile
            </button>
          </div>
      }
    </>
  )
}

export default profilePage