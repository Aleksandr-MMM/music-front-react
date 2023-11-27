import React from "react";

export const CustomParagraphComponent=({children,style}:React.HTMLAttributes<HTMLParagraphElement>): React.ReactElement=>{
    return <p style={style}>
        {children}
    </p>
}