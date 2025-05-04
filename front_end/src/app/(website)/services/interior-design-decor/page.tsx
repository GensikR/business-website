"use client";
import ServiceInfo from "@/components/services/ServiceInfo";
import React from "react";
import {getService} from "@/lib/getService";
import EstimatorHome from "@/components/estimate/EstimatorHome";
import Scheduler from "@/components/scheduler/Scheduler";
import FeaturedWork from "@/components/portfolio/FeaturedWork";

const service = getService("/services/interior-design-decor");


export default function InteriorDesignService() 
{
    return(
        <div>
        < ServiceInfo service = {service} />
        < FeaturedWork />
        < EstimatorHome />
        < Scheduler />
        </div>
    )
}

