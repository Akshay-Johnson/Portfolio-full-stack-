"use client";

import { useMemo } from "react";
import LoaderCamp from "@/components/loaderCamp";
import LoaderSpace from "@/components/loaderSpace";

const loaders = [LoaderCamp, LoaderSpace];

export default function Loader() {
  const SelectedLoader = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * loaders.length);
    return loaders[randomIndex];
  }, []);

  return <SelectedLoader />;
}
