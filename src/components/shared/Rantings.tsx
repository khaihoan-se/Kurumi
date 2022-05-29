import { Media } from "@/types";
import React from "react";
import Section from "./Section";
import CardSwiper from "./CardSwiper";


interface RantingProps<T> {
    data: T extends 'anime' ? Media[] : Media[];
    type: T;
    title?: string;
}
const Rantings = <T extends 'manga' | 'anime' >({
    data,
    type,
    title,
}: RantingProps<T>) => {
    return (
        <Section title={title} className="mt-10">
            <CardSwiper data={data} type={type} />
        </Section>
    )
}
export default Rantings;