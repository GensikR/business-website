"use client";
import ServiceInfo from "@/components/services/ServiceInfo";
import React from "react";
import {getService} from "@/lib/getService";
import EstimatorHome from "@/components/estimate/EstimatorHome";
import Scheduler from "@/components/scheduler/Scheduler";


const service = getService("/services/custom-furniture");


export default function CustomFurniture() 
{
    return(
        <div>
        < ServiceInfo service = {service} />

        < EstimatorHome />
        < Scheduler />
        </div>
    )
}

