import React from "react";

export type BreadcrumbData = {
    url: Record<string, string> | string
    name: string
}
export type BreadcrumbsData = BreadcrumbData[]

export interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbsData
    areBreadcrumbsVisible: boolean
}

export class Breadcrumbs extends React.Component<BreadcrumbsProps> {}

export default Breadcrumbs