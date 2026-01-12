import { type ComponentProps } from 'react';
import logo from "@/assets/unnamed (3).jpg";
interface ApplicationLogoProps extends ComponentProps<'svg'> {
    className?: string;
}

export default function ApplicationLogo({ className = '', ...props }: ApplicationLogoProps) {
    return (
        <>
            <img src={logo} alt="Logo" className={className} {...props} />
        </>
    );
}
