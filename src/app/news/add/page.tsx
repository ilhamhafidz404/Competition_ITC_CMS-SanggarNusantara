"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

// components
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/TipTap"), {
  ssr: false,
});

// icons
import { IconArrowLeft } from "justd-icons";

// Models
import { FormDataNews } from "@/models/News";

// API / HOOKS
import useUploadImage from "@/hooks/_uploadImage";
import { useStoreNews } from "@/hooks/useNews";
import { ToastContainer } from "react-toastify";

export default function NewsAddPage() {
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataNews>({
    cover: null,
    title: "",
    description: "",
    body: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (true) {
      handleCreateNews(formData);
    }
  };

  const mutationCreateNews = useStoreNews();
  const mutationUploadImage = useUploadImage();

  const handleCreateNews = (data: FormDataNews) => {
    const formData = new FormData();

    formData.append("cover", data.cover ? data.cover : "");

    mutationUploadImage.mutate(formData, {
      onSuccess: (response) => {
        const resCover = response.data.cover.replace("news/", "");

        // data.cover = resCover;

        mutationCreateNews.mutate({
          body: editorRef.current?.getContent() || "",
          cover: resCover,
          description: data.description,
          title: data.title,
        });

        // setIsLoadingSubmit(false);
      },
      onError: (error) => {
        console.error("Upload failed:", error);
        // setIsLoadingSubmit(false);
      },
    });
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Set banner preview
      reader.onload = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Update formData with the selected file
      setFormData((prevData) => ({
        ...prevData,
        cover: file, // Simpan file dalam formData
      }));
    }
  };

  return (
    <>
      <Navbar active={2} />

      <ToastContainer theme="dark" />

      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">ADD NEWS</h2>
            <Link href={"/news"} className="btn btn-error btn-outline">
              <IconArrowLeft className="w-5" />
              back
            </Link>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="grid grid-cols-3 gap-7"
          >
            <div className="relative">
              <div className="sticky top-0">
                <div className="mb-10">
                  <label className="label-text" htmlFor="banner">
                    Banner
                  </label>
                  <label htmlFor="banner">
                    <img
                      src={bannerPreview || "/img-placeholder.png"}
                      alt="bannerPreview"
                      className="rounded cursor-pointer w-[700px] h-[300px] object-cover mx-auto"
                    />
                    <input
                      id="banner"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBannerChange}
                    />
                  </label>
                </div>
                <hr className="my-5 border-neutral" />
                <div className="mb-5">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Title</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Description</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </label>
                </div>
                <div>
                  <button
                    className="btn btn-error"
                    type="submit"
                    // onClick={() => handleGetContent()}
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-5">
                <label htmlFor="content">Content</label>

                <TiptapEditor ref={editorRef} />
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
