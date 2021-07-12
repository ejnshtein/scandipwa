import React from "react";

export interface BreadcrumbProps {
    index: number
    isDisabled: boolean
    url?: string | Record<string, string>
    name?: string
}

export class Breadcrumb extends React.Component<BreadcrumbProps> {}

export default Breadcrumb