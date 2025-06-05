"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Services from "@/components/services/Services";

export default function servicePage()
{
    return (
        <div>
        <Services />
        </div>
    )
}