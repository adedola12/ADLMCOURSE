"use client"

import { Category } from "@prisma/client"

import {
    FcAcceptDatabase,
    FcBusiness,
    FcIphone,
    FcEngineering,
    FcFilmReel,
    FcMusic,
    FcSalesPerformance,
    FcOldTimeCamera,
    FcSportsMode,
    FcCalculator,
    FcBusinessman
} from "react-icons/fc"

import { IconType } from "react-icons"
import { CategoryItem } from "./category-items"

interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> ={
    "Building Construction": FcEngineering,
    "General": FcAcceptDatabase,
    "Architectural": FcBusinessman,
    "Net Zero": FcSalesPerformance,
    "Quantity Surveying": FcCalculator,
}

export const Categories =({items}: CategoriesProps) => {

    return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2s">
        {items.map((item) => (
            <CategoryItem 
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
        ))}
    </div>
    )
}